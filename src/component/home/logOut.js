import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { logOut } from "../../services";
import { useDispatch } from "react-redux";
import { log_Out } from "../../redux/counter/actions";

function LogOut(props) {
  const { show, setShow, user, accessToken } = props;
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleLogout = async () => {
    const rs = await logOut(user, accessToken);
    if (rs.EC == 0) {
      dispatch(log_Out());
    }
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
        <Modal.Body>
          do you want to log out account that have name as {user}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogOut;
