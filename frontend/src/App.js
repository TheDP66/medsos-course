import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import StatusModal from "./components/StatusModal";

import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from "./redux/actions/suggestionsAction";
import { getNotifies } from "./redux/actions/notifyAction";

import CallModal from "./components/message/CallModal";

import Peer from "peerjs";

import io from "socket.io-client";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import SocketClient from "./SocketClient";
// const ENDPOINT = "http://localhost:4001";
const ENDPOINT = "https://medsos-backend66.herokuapp.com:4001";

function App() {
  const { auth, status, modal, call } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());

    const socket = io(ENDPOINT);
    dispatch({
      type: GLOBALTYPES.SOCKET,
      payload: socket,
    });
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
        }
      });
    }
  }, []);

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      //// Local
      // host: "/",
      // port: "3001",
      //// Public
      path: "/",
      secure: true,
    });
    // console.log(newPeer);

    dispatch({
      type: GLOBALTYPES.PEER,
      payload: newPeer,
    });
  }, [dispatch]);

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className={`app ${(status || modal) && "mode"}`}>
        <div className="main">
          {auth.token && <Header />}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}

          <div className="wrap_page">
            <Routes>
              <Route
                exact
                path="/"
                element={auth.token ? <Home /> : <Login />}
              />
              <Route exact path="/register" element={<Register />} />
              {/* </Routes> */}

              {/* <Routes> */}
              <Route exact path="/" element={<PrivateRouter />}>
                <Route exact path="/:page" element={<PageRender />} />
              </Route>
              <Route exact path="/" element={<PrivateRouter />}>
                <Route exact path="/:page/:id" element={<PageRender />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
