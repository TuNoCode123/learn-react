import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoIosAddCircle } from "react-icons/io";
// import { ViewUser } from "../../../services";
import "./manageUser.css";
import { toast } from "react-toastify";
function ViewUser(props) {
  const { show, setShow } = props;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("USER");
  const [img, setImg] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { dataUser } = props;
  useEffect(() => {
    setEmail(dataUser.email);
    setName(dataUser.username);
    setRole(dataUser.role);
    setImg(dataUser.image);
  }, [dataUser]);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div class="form-group">
              <label for="exampleInputEmail1">Email</label>
              <input
                type="email"
                class="form-control mt-2"
                placeholder="name"
                disabled
                value={email}
              />
            </div>
          </div>
          <div className="row">
            <div class="form-group">
              <label for="exampleInputPassword1">Role</label>
              <input
                class="form-control mt-2"
                placeholder="role"
                disabled
                value={role}
              />
            </div>
          </div>
          <div className="row">
            <div class="form-group">
              <label for="exampleInputEmail1">UserName</label>
              <input
                class="form-control"
                placeholder="name"
                onChange={(event) => setName(event.target.value)}
                value={name}
                disabled
              />
            </div>
          </div>
          <div className="row">
            <div className="img">
              {img ? (
                <img src={`data:image/png;base64,${img}`}></img>
              ) : (
                <span>Previos Img</span>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewUser;
