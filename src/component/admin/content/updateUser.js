import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoIosAddCircle } from "react-icons/io";
import { updateUser } from "../../../services";
import { toast } from "react-toastify";

function UpdateUser(props) {
  const { show, setShow } = props;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("USER");
  const [img, setImg] = useState("");
  const [preImg, setPreImg] = useState("");
  const handleClose = () => setShow(false);
  const handleImg = (event) => {
    setPreImg(URL.createObjectURL(event.target.files[0]));
    setImg(event.target.files[0]);
  };
  const { dataUser } = props;

  useEffect(() => {
    setEmail(dataUser.email);
    setName(dataUser.username);
    setRole(dataUser.role);
    setImg(dataUser.image);
  }, [dataUser]);
  const correctUser = async () => {
    const response = await updateUser(dataUser.id, name, img);
    if (response.EC == 0) {
      toast.success(response.EM);
    }
    await props.hanllePaginate();
    setShow(false);
  };
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
            <div class="form-group col-6">
              <label for="exampleInputEmail1">Email</label>
              <input
                type="email"
                class="form-control mt-2"
                placeholder="name"
                disabled
                value={email}
              />
            </div>
            <div class="form-group col-6">
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
            <div class="form-group col-6">
              <label for="exampleInputEmail1">UserName</label>
              <input
                class="form-control mt-2"
                placeholder="name"
                onChange={(event) => setName(event.target.value)}
                value={name}
              />
            </div>
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
          <div className="row">
            <div className="img">
              {preImg ? (
                <img src={preImg} />
              ) : img ? (
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
          <Button variant="primary" onClick={correctUser}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateUser;
