import piclogin from "../../assets/login.png"; //kalau titiknya 2 berarti ada 2 folder di luar
import logo from "../../assets/logo.png";

const Login = () => {
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
          <div className="form-group">
            <input type="text" id="username" name="username" placeholder="Username" />
            <input type="password" id="password" name="password" placeholder=" Password" />
            <button type="submit" className="btn-login">
              Masuk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
