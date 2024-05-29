import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Overview(props) {
  const { show, setShow, kq } = props;
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>My Consequence</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {kq && (
            <>
              <div>Số Câu Trả Lời Đúng: {kq.DT.countCorrect}</div>
              <div>Tổng số câu hỏi đã có là: {kq.DT.countTotal} </div>
            </>
          )}
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

export default Overview;
