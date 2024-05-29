import { useState } from "react";
import Select from "react-select";
import { IoIosAddCircle } from "react-icons/io";
import { addQuizz } from "../../../../services";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { showListQuizz } from "../../../../redux/counter/actions";
const CreateQuizz = () => {
  const [description, setDescription] = useState();
  const [name, setName] = useState();
  const [difficulty, setDifficulty] = useState();
  const [image, setImage] = useState();
  const options = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    const res = await addQuizz(description, name, difficulty?.value, image);
    if (res && res.EC == 0) {
      toast.success(res.EM);
    } else if (res && res.EC == -1) {
      toast.error(res.EM);
    }
    dispatch(showListQuizz());
  };
  return (
    <div className="form mt-3">
      <div class="form-group col-10">
        <label>Description</label>
        <input
          type="text"
          class="form-control mt-2"
          id="description"
          aria-describedby="emailHelp"
          placeholder="Enter description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <div class="form-group col-10">
        <label>Name</label>
        <input
          type="text"
          class="form-control mt-2"
          id="name"
          aria-describedby="emailHelp"
          placeholder="Enter name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="form-group col-4">
        <Select
          defaultValue={difficulty}
          onChange={setDifficulty}
          options={options}
        />
      </div>
      <div className="form-group add">
        <label htmlFor="file">
          <IoIosAddCircle /> <span> Add Image</span>
        </label>
        <input
          type="file"
          class="form-control"
          id="file"
          aria-describedby="emailHelp"
          placeholder="Enter name"
          onChange={(event) => setImage(event.target.files[0])}
          hidden
        />
      </div>
      <div className="form-group">
        <button type="button" class="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
export default CreateQuizz;
