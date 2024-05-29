import { useEffect, useState } from "react";
import "./login.css";
import { changePass, login } from "../../services";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/counter/actions";
import Language from "../languages/languages";

import ChangePass from "./changePass";
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [passWord, setPassWord] = useState();
  const navigate = useNavigate();
  const stage = useSelector((state) => state.login.stage);
  const description = useSelector((state) => state.login.description);
  const loading = useSelector((state) => state.login.isloading);
  const nav = useNavigate();
  if (loading) {
    switch (stage) {
      case 0: {
        toast.success(description);
        navigate("/");
        return;
      }
      case -1: {
        toast.error(description);
        return;
      }
      case -2: {
        toast.error(description);
        return;
      }
    }
  }

  const handleLogin = () => {
    dispatch(loginUser(email, passWord));
    setEmail("");
    setPassWord("");
  };

  return (
    <>
      <div>
        <div className="d-flex position-absolute top-25 end-0 gap-2 align-items-center m-2 header">
          <div className="d-flex gap-2 align-items-center">
            <span>có phải bạn chưa có tài khoản</span>
            <button
              className="btn btn-info"
              onClick={() => navigate("/sing-up")}
            >
              Sing up
            </button>
          </div>
          <Language />
        </div>
        <div className="login1">
          <form className="mt-5  mx-auto" method="get">
            <div className=" mx-auto col-8">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="mx-auto mt-2 col-8">
              <label className="form-label">Password</label>
              <input
                type="text"
                className="form-control"
                id="passWord"
                value={passWord}
                onChange={(event) => setPassWord(event.target.value)}
              />
            </div>
          </form>
          <div className="mx-auto col-8 mt-3 bt">
            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Login
            </button>
          </div>

          <button className="btn btn-dark" onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      </div>
    </>
  );
};
export default Login;
