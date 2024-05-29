import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuizz } from "../../../../services";
import { useDispatch } from "react-redux";
import { showListQuizz } from "../../../../redux/counter/actions";
function DeleteQuizz(props) {
  const { show, setShow, getQuizzDelete } = props;
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const deleteUser = async () => {
    const response = await deleteQuizz(getQuizzDelete);
    if (response.EC == 0) {
      toast.success(response.EM);
    } else if (response.EC == -1) {
      toast.error(response.EM);
    }
    dispatch(showListQuizz());
    handleClose();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You want to remove Quizz that have the id = {getQuizzDelete}
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

export default DeleteQuizz;
