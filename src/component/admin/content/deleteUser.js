import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { removeUser } from "../../../services";
function DeleteUser(props) {
  const { show, setShow, dataUser, setCurrentPage } = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteUser = async () => {
    const response = await removeUser(dataUser.id);
    if (response.EC == 0) {
      toast.success(response.EM);
    } else if (response.EC == -1) {
      toast.error(response.EM);
    }
    setCurrentPage(1);
    handleClose();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          you want to remove user that have the{" "}
          <span className="h4">username</span> as {dataUser.username}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteUser}>
            delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteUser;
