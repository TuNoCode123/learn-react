import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoIosAddCircle } from "react-icons/io";
import "./manageUser.css";
import { prettyDOM } from "@testing-library/react";
import { toast } from "react-toastify";
import { apiAddUser } from "../../../services";
const Example = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("USER");
  const [img, setImg] = useState("");
  const [preImg, setPreImg] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleImg = (event) => {
    console.log("fkjahsfkjadsh");
    setPreImg(URL.createObjectURL(event.target.files[0]));
    setImg(event.target.files[0]);
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSubmit = async () => {
    if (!password || !email || !name) {
      toast.error("input missing");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Email invalid");
      return;
    }
    const response = await apiAddUser(email, password, name, role, img);
    response.EC ? toast.error(response.EM) : toast.success(response.EM);
    setShow();
  };
  return (
    <>
      <Button className="newuser" variant="primary" onClick={handleShow}>
        create new user
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="display-model"
      >
        <Modal.Header closeButton>
          <Modal.Title>add user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                placeholder="Password"
                onChange={(event) => setPassWord(event.target.value)}
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label">User Name</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="User Name"
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="col-md-7">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                onChange={(event) => setRole(event.target.value)}
              >
                <option defaultValue="user">USER</option>
                <option>ADMIN</option>
              </select>
            </div>
            <div className="col-12">
              <label htmlFor="addimg" className="form-label add">
                <IoIosAddCircle /> add picture
              </label>
              <input
                type="file"
                id="addimg"
                hidden
                onChange={(event) => handleImg(event)}
              />
            </div>
            <div className="col-12 display-picture">
              <div className="img">
                {preImg ? <img src={preImg} /> : "preImg"}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleSubmit}>
            add user
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Example;
