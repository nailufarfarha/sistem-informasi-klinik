import React, { useState } from "react";
import piclogin from "../../assets/login.png"; //kalau titiknya 2 berarti ada 2 folder di luar
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [succsesMsg, setSuccsesMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setErrorMsg("");
      setSuccsesMsg("");
      const response = await axios.post("http://localhost:8080/api/v1/auth", {
        username,
        password,
      });
      console.log(response);
      if (response.status === 200) {
        setSuccsesMsg("Berhasil Login");
        localStorage.setItem("password", response.data.user.password);

        navigate("/dashboard");
      } else if (response.status === 401) {
        setErrorMsg("Email atau password tidak ditemukan");
      }
    } catch (error) {
      console.log("Error during login:", error);
      setErrorMsg("Terjadi kesalahan pada server");
    }
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
          <h4 className="txt-log">Login Admin</h4>

          <form onSubmit={handleLoginSubmit}>
            <p>{succsesMsg}</p>
            <p>{errorMsg}</p>
            <div className="form-group">
              <input type="text" id="username" name="username" placeholder="Username" value={username} autoComplete="off" onChange={(event) => setUsername(event.target.value)} />
              <input type="password" id="password" name="password" placeholder=" Password" value={password} autoComplete="off" onChange={(event) => setPassword(event.target.value)} />
              <button type="submit" className="btn-login">
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
