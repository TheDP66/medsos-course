import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { POST_TYPES } from "./redux/actions/postAction";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import { NOTIFY_TYPES } from "./redux/actions/notifyAction";
import { MESS_TYPES } from "./redux/actions/messageAction";

import audiobell from "./audio/Notification.mp3";

const spawnNotification = (body, icon, url, title) => {
  let options = {
    body,
    icon,
  };
  let n = new Notification(title, options);

  n.onclick = (e) => {
    e.preventDefault();

    window.open(url, "_blank");
  };
};

const SocketClient = () => {
  const { auth, socket, notify, online, call } = useSelector((state) => state);
  const dispatch = useDispatch();

  const audioRef = useRef();

  // joinUser / Connect
  useEffect(() => {
    socket.emit("joinUser", auth.user);
  }, [socket, auth.user]);

  // Likes
  useEffect(() => {
    socket.on("likeToClient", (newPost) => {
      console.log(newPost);
      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost,
      });
    });

    return () => socket.off("likeToClient");
  }, [socket, dispatch]);

  // unLikes
  useEffect(() => {
    socket.on("unLikeToClient", (newPost) => {
      // console.log(newPost);
      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost,
      });
    });

    return () => socket.off("unLikeToClient");
  }, [socket, dispatch]);

  // Create Comments
  useEffect(() => {
    socket.on("createCommentToClient", (newPost) => {
      // console.log(newPost);
      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost,
      });
    });

    return () => socket.off("createCommentToClient");
  }, [socket, dispatch]);

  // Delete Comments
  useEffect(() => {
    socket.on("deleteCommentToClient", (newPost) => {
      // console.log(newPost);
      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost,
      });
    });

    return () => socket.off("deleteCommentToClient");
  }, [socket, dispatch]);

  // Follow
  useEffect(() => {
    socket.on("followToClient", (newUser) => {
      // console.log(newPost);
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: { ...auth, user: newUser },
      });
    });

    return () => socket.off("followToClient");
  }, [socket, dispatch, auth]);

  // UnFollow
  useEffect(() => {
    socket.on("unFollowToClient", (newUser) => {
      // console.log(newPost);
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: { ...auth, user: newUser },
      });
    });

    return () => socket.off("unFollowToClient");
  }, [socket, dispatch, auth]);

  // Notification
  useEffect(() => {
    socket.on("createNotifyToClient", (msg) => {
      // console.log(newPost);
      dispatch({
        type: NOTIFY_TYPES.CREATE_NOTIFY,
        payload: msg,
      });

      if (notify.sound) audioRef.current.play();

      spawnNotification(
        msg.user.username + " " + msg.text,
        msg.user.avatar,
        msg.url,
        "V-NETWORK"
      );
    });

    return () => socket.off("createNotifyToClient");
  }, [socket, dispatch, notify.sound]);

  useEffect(() => {
    socket.on("removeNotifyToClient", (msg) => {
      // console.log(msg);

      dispatch({
        type: NOTIFY_TYPES.REMOVE_NOTIFY,
        payload: msg,
      });
    });

    return () => socket.off("removeNotifyToClient");
  }, [socket, dispatch]);

  // Add Message
  useEffect(() => {
    socket.on("addMessageToClient", (msg) => {
      // console.log(msg);

      dispatch({
        type: MESS_TYPES.ADD_MESSAGE,
        payload: msg,
      });

      dispatch({
        type: MESS_TYPES.ADD_USER,
        payload: {
          ...msg.user,
          text: msg.text,
          media: msg.media,
        },
      });
    });
    return () => socket.off("addMessageToClient");
  }, [socket, dispatch]);

  // Check User Online/Offline
  useEffect(() => {
    socket.emit("checkUserOnline", auth.user);
  }, [socket, auth.user]);

  useEffect(() => {
    socket.on("checkUserOnlineToMe", (data) => {
      // console.log(data);

      data.forEach((item) => {
        if (!online.includes(item.id)) {
          dispatch({
            type: GLOBALTYPES.ONLINE,
            payload: item.id,
          });
        }
      });
    });

    return () => socket.off("checkUserOnlineToMe");
  }, [socket, dispatch, online]);

  useEffect(() => {
    socket.on("checkUserOnlineToClient", (id) => {
      // console.log(id);
      if (!online.includes(id)) {
        dispatch({
          type: GLOBALTYPES.ONLINE,
          payload: id,
        });
      }
    });

    return () => socket.off("checkUserOnlineToClient");
  }, [socket, dispatch, online]);

  // Check User Offline
  useEffect(() => {
    socket.on("CheckUserOffline", (id) => {
      // console.log(id);

      dispatch({
        type: GLOBALTYPES.OFFLINE,
        payload: id,
      });
    });

    return () => socket.off("CheckUserOffline");
  }, [socket, dispatch]);

  // Call User
  useEffect(() => {
    socket.on("callUserToClient", (data) => {
      // console.log(data);

      dispatch({
        type: GLOBALTYPES.CALL,
        payload: data,
      });
    });

    return () => socket.off("callUserToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("userBusy", (data) => {
      // console.log(data);

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: `${call.username} is busy!`,
        },
      });
    });

    return () => socket.off("userBusy");
  }, [socket, dispatch, call]);

  return (
    <>
      <audio controls ref={audioRef} style={{ display: "none" }}>
        <source src={audiobell} type="audio/mp3" />
      </audio>
    </>
  );
};

export default SocketClient;
