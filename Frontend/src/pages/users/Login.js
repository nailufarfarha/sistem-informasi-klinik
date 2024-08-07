import React, { useState, Fragment } from "react";
import piclogin from "../../assets/login.png";
import logo from "../../assets/logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [redirect, setRedirect] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
    setErrorMsg("");
  };

  const onChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrorMsg("");
  };

  const handleLogin = () => {
    const data = {
      username: username,
      password: password,
    };
    axios
      .post("http://localhost:8081/login", data)
      .then((result) => {
        if (result) {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("username", result.data.username); // Simpan username ke localStorage
          localStorage.setItem("namalengkap", result.data.namalengkap); // Simpan username ke localStorage
          localStorage.setItem("umur", result.data.umur); // Simpan username ke localStorage
          localStorage.setItem("alamat", result.data.alamat); // Simpan username ke localStorage
          localStorage.setItem("nohp", result.data.nohp); // Simpan username ke localStorage
          setRedirect(true);
        }
      })
      .catch((e) => {
        setErrorMsg(e.response.data.message);
      });
  };

  return (
    <Fragment>
      {redirect && <Navigate to="/janji-temu" />}
      <div className="container-fluid">
        <div className="row">
          <div className="header-logo col-md-6">
            <div className="icon-log">
              <img src={piclogin} />
            </div>
          </div>

          <div className="col-md-6 ">
            <div className="pic-log">
              <img src={logo} />
            </div>
            <h4 className="txt-log">Login</h4>
            <h6 style={{ textAlign: "center" }}>Silahkan login terlebih dahulu!</h6>

            <div>
              <p>{errorMsg}</p>
              <div className="form-group">
                <input type="text" id="username" name="username" placeholder="Username" value={username} autoComplete="off" onChange={onChangeUsername} />
                <input type="password" id="password" name="password" placeholder=" Password" value={password} autoComplete="off" onChange={onChangePassword} />
                <button type="submit" className="btn-login" onClick={handleLogin}>
                  Masuk
                </button>

                <Link to="/daftar">Belum punya akun? Daftar sekarang.</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
