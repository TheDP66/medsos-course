import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../redux/actions/authAction";

function Register() {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useNavigate();

  // membuat objek untuk state awal
  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male",
  };
  // memasangkan initial state ke userData
  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, cf_password } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  useEffect(() => {
    if (auth.token) history("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    // mendapatkan name dan value dari input component
    const { name, value } = e.target;

    // mengupdate userData dengan data baru
    setUserData({
      ...userData,
      [name]: value,
    });
    // console.log(userData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(userData);
    dispatch(register(userData));
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center">V-Network</h3>

        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            onChange={handleChangeInput}
            value={fullname}
            name="fullname"
            style={{ background: `${alert.fullname ? "#fd2d6a14" : ""}` }}
          />
          <div className="form-text text-danger">
            {alert.fullname ? alert.fullname : ""}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            onChange={handleChangeInput}
            value={username?.toLowerCase().replace(/ /g, "")}
            name="username"
            autoComplete="nickname"
            style={{ background: `${alert.username ? "#fd2d6a14" : ""}` }}
          />
          <div className="form-text text-danger">
            {alert.username ? alert.username : ""}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            value={email}
            name="email"
            style={{ background: `${alert.email ? "#fd2d6a14" : ""}` }}
          />
          <div className="form-text text-danger">
            {alert.email ? alert.email : ""}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
              autoComplete="new-password"
              style={{ background: `${alert.password ? "#fd2d6a14" : ""}` }}
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "Hide" : "Show"}
            </small>
          </div>
          <div className="form-text text-danger">
            {alert.password ? alert.password : ""}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="cf_password1" className="form-label">
            Confirm Password
          </label>
          <div className="pass">
            <input
              type={typeCfPass ? "text" : "password"}
              className="form-control"
              id="cf_password1"
              onChange={handleChangeInput}
              value={cf_password}
              name="cf_password"
              autoComplete="new-password"
              style={{ background: `${alert.cf_password ? "#fd2d6a14" : ""}` }}
            />
            <small onClick={() => setTypeCfPass(!typeCfPass)}>
              {typeCfPass ? "Hide" : "Show"}
            </small>
          </div>
          <div className="form-text text-danger">
            {alert.cf_password ? alert.cf_password : ""}
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mx-0 mb-1">
          <div className="mb-3 form-check form-check-inline">
            <label htmlFor="male" className="form-check-label">
              Male{" "}
            </label>
            <input
              className="form-check-input"
              type={"radio"}
              id="male"
              name="gender"
              value={"male"}
              defaultChecked
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3 form-check form-check-inline">
            <label htmlFor="female" className="form-check-label">
              Female{" "}
            </label>
            <input
              className="form-check-input"
              type={"radio"}
              id="female"
              name="gender"
              value={"female"}
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3 form-check form-check-inline">
            <label htmlFor="other" className="form-check-label">
              Other{" "}
            </label>
            <input
              className="form-check-input"
              type={"radio"}
              id="other"
              name="gender"
              value={"other"}
              onChange={handleChangeInput}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-dark w-100">
          Register
        </button>

        <p className="my-2">
          Already have an account?{" "}
          <Link to={"/"} style={{ color: "crimson" }}>
            Login Now
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
