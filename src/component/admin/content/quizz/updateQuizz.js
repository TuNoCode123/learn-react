import { update } from "lodash";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoIosAddCircle } from "react-icons/io";
import Select from "react-select";
import { updateQuizz, updateUser } from "../../../../services";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { showListQuizz } from "../../../../redux/counter/actions";
function UpdateQuizz(props) {
  const { show, setShow, quizz } = props;
  const [difficulty, setDifficulty] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState();
  const [img, setImg] = useState("");
  const [preImg, setPreImg] = useState("");
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const options = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];
  const handleImg = (event) => {
    setPreImg(URL.createObjectURL(event.target.files[0]));
    setImg(event.target.files[0]);
  };
  useEffect(() => {
    setDifficulty(quizz?.difficulty);
    setDescription(quizz?.description);
    setId(quizz?.id);
    setName(quizz?.name);
    setImg(quizz?.image);
  }, [quizz]);
  const correctQuizz = async () => {
    const res = await updateQuizz(
      id,
      description,
      name,
      difficulty?.value,
      img,
      difficulty
    );
    if (res.EC == 0) {
      toast.success(res.EM);
    }
    dispatch(showListQuizz());
    handleClose();
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
              <label for="exampleInputEmail1">Id</label>
              <input
                type="id"
                class="form-control mt-2"
                placeholder="name"
                value={id}
                onChange={(event) => setId(event.target.value)}
              />
            </div>
            <div class="form-group col-6">
              <label for="exampleInputPassword1">name</label>
              <input
                class="form-control mt-2"
                placeholder="role"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div class="form-group col-6">
              <label for="exampleInputEmail1">Description</label>
              <input
                class="form-control mt-2"
                placeholder="name"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div class="form-group col-6">
              <div className="mb-2">Difficulty :</div>
              <Select
                defaultValue={difficulty}
                onChange={setDifficulty}
                options={options}
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
          <Button variant="primary" onClick={correctQuizz}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateQuizz;
