import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
function ViewQuizz(props) {
  const { show, setShow, getId } = props;
  const handleClose = () => setShow(false);
  const data = useSelector((state) => state?.listQuizz?.quizzs)?.DT?.find(
    (item) => item.id == getId
  );
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Information Quizz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data && (
            <>
              <div className="row">
                <div class="form-group col-10">
                  <label for="exampleInputEmail1">Id</label>
                  <input
                    type="email"
                    class="form-control mt-2"
                    placeholder="name"
                    value={data.id}
                    disabled
                  />
                </div>
              </div>
              <div className="row">
                <div class="form-group col-10">
                  <label for="exampleInputEmail1">Name</label>
                  <input
                    class="form-control mt-2"
                    placeholder="name"
                    value={data.name}
                    disabled
                  />
                </div>
              </div>
              <div className="row">
                <div class="form-group col-6">
                  <label for="exampleInputEmail1">Description</label>
                  <input
                    class="form-control mt-2"
                    placeholder="name"
                    value={data.description}
                    disabled
                  />
                </div>
              </div>
              <div className="row">
                <div class="form-group col-6">
                  <label for="exampleInputEmail1">Difficulty</label>
                  <input
                    class="form-control mt-2"
                    placeholder="name"
                    value={data.difficulty}
                    disabled
                  />
                </div>
              </div>

              <div className="row">
                <div className="img">
                  {data.image ? (
                    <img src={`data:image/png;base64,${data.image}`}></img>
                  ) : (
                    "preimg"
                  )}
                </div>
              </div>
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

export default ViewQuizz;
