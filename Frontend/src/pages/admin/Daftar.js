import React, { useState } from "react";
import piclogin from "../../assets/login.png";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Daftar = () => {
  const [namalengkap, setNamalengkap] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const ChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
    setErrorMsg("");
  };

  const ChangeNamalengkap = (e) => {
    const value = e.target.value;
    setNamalengkap(value);
    setErrorMsg("");
  };

  const ChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrorMsg("");
  };

  const handleRegist = () => {
    const data = {
      namalengkap: namalengkap,
      username: username,
      password: password,
    };

    axios
      .post("http://localhost:8081/daftar", data)
      .then((result) => {
        if (result) {
          if (result.data) {
            setNamalengkap("");
            setUsername("");
            setPassword("");

            setMessage(result.data.message);

            setTimeout(() => {
              setMessage("");
              navigate("/login"); // Melakukan navigasi ke halaman login setelah 5 detik
            }, 2000);

            // setTimeout(() => {
            //   setMessage("");
            // }, 5000);
          }
        }
      })
      .catch((e) => {
        setErrorMsg(e.response.data.message);
      });
  };

  return (
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
          <h4 className="txt-log">Daftar Admin</h4>

          <div>
            <p>{Message}</p>
            <p>{errorMsg}</p>

            <div className="form-group">
              <input type="text" id="namalengkap" name="namalengkap" placeholder="Nama Lengkap" value={namalengkap} autoComplete="off" onChange={ChangeNamalengkap} />
              <input type="text" id="username" name="username" placeholder="Username" value={username} autoComplete="off" onChange={ChangeUsername} />
              <input type="password" id="password" name="password" placeholder=" Password" value={password} autoComplete="off" onChange={ChangePassword} />
              <button className="btn-login" onClick={handleRegist}>
                Daftar
              </button>
              <Link to="/login">Sudah punya akun? Login disini.</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Daftar;
