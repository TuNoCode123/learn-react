import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { assgineQU, getUser } from "../../../../services";
import { toast } from "react-toastify";
const Assgine = (props) => {
  const quizz = useSelector((state) => state?.listQuizz?.quizzs);
  const [listUser, setListUser] = useState();
  const [chooseQuizz, setChooseQuizz] = useState();
  const [chooseUser, setChooseUser] = useState();
  const options = quizz?.DT?.map((item) => {
    return {
      value: item?.id,
      label: `${item.id} - ${item.name}`,
    };
  });
  const getUserMain = async () => {
    try {
      const res = await getUser();
      const newRs = res.DT.map((item) => {
        return {
          value: item?.id,
          label: `${item.id} - ${item.email}`,
        };
      });
      setListUser(newRs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserMain();
  }, []);
  const handleAssgine = async () => {
    if (!chooseQuizz || !chooseUser) {
      toast.error("not choose anything");
      return;
    }
    const rs = await assgineQU(chooseQuizz.value, chooseUser.value);
    if (rs.EC == 0) {
      toast.success(rs.EM);
    } else {
      toast.error(rs.EM);
    }
  };
  return (
    <>
      <div className="d-flex justify-content-between gap-2">
        <div className="quizz col-6">
          <Select
            defaultValue={chooseQuizz}
            onChange={setChooseQuizz}
            options={options}
          />
        </div>
        <div className="user col-6">
          <Select
            defaultValue={chooseUser}
            onChange={setChooseUser}
            options={listUser}
          />
        </div>
      </div>
      <div>
        <button className="btn btn-warning mt-3" onClick={handleAssgine}>
          Assgine
        </button>
      </div>
    </>
  );
};
export default Assgine;
