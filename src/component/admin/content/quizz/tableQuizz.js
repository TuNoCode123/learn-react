import { useEffect } from "react";
import "./quizz.css";
import { useDispatch, useSelector } from "react-redux";
import { showListQuizz } from "../../../../redux/counter/actions";
import _ from "lodash";
const TableQuizz = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showListQuizz());
  }, []);
  const data = useSelector((state) => state?.listQuizz?.quizzs);
  let sorted_obj =
    data && data.EC == 0
      ? _.sortBy(data.DT, [
          function (o) {
            return o.id;
          },
        ])
      : false;
  const handleView = (id) => {
    props.setShow(true);
    props.setGetId(id);
  };
  const handleDelete = (id) => {
    props.setShowDelete(true);
    props.setgetQuizzDelete(id);
  };
  const handleUpdate = (quizz) => {
    props.setShowUpdate(true);
    props.setQuizz(quizz);
  };
  return (
    <>
      <table class="table table-bordered  mt-5">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Difficulty</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {sorted_obj &&
            sorted_obj.map((item) => {
              return (
                <>
                  <tr>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.difficulty}</td>
                    <td className="d-flex gap-2">
                      <button
                        className="btn btn-warning"
                        onClick={() => handleView(item.id)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleUpdate(item)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
export default TableQuizz;
