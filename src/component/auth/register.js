import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { singUp } from "../../services";
import { toast } from "react-toastify";
import "./register.css";
import "react-bootstrap";
import { GrFormViewHide, GrHide } from "react-icons/gr";
import { BiSolidShow } from "react-icons/bi";
const Register = () => {
  const [email, setEmail] = useState();
  const [passWord, setPassWord] = useState();
  const [name, setName] = useState();
  const [show, setShow] = useState(true);
  const nav = useNavigate();
  const handleSingUp = async () => {
    const response = await singUp(email, passWord, name);
    if (response.EC == 0) {
      toast.success(response.EM);
      nav("/");
      return;
    }
    toast.error(response.EM);
  };
  return (
    <>
      <div className="singup">
        <span> bạn đã có tài khoản?</span>
        <button className="btn btn-info m-2" onClick={() => nav("/login")}>
          login
        </button>
      </div>
      <div className="container-fluid  d-flex justify-content-center align-items-center">
        <form className="col-6 border border-secondary">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="text"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div class="form-group mt-2 position-relative">
            <label for="exampleInputPassword1">Password</label>
            <input
              type={show ? "text" : "passWord"}
              class="form-control"
              id="pass"
              placeholder="Password"
              value={passWord}
              onChange={(event) => setPassWord(event.target.value)}
              required
            />
            <div className="icon" onClick={() => setShow(!show)}>
              {show ? <BiSolidShow /> : <GrFormViewHide />}
            </div>
          </div>
          <div class="form-group mt-2">
            <label for="exampleInputPassword1">User Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Password"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <button
            type="button"
            onClick={handleSingUp}
            class="btn btn-primary mt-2"
          >
            Sing Up
          </button>
        </form>
      </div>
    </>
  );
};
export default Register;
