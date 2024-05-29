import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getDetailQuizz, subMitAnswer } from "../../services";
import "./quizz.css";
import _ from "lodash";
import Question from "./questions";
import Overview from "./overview";
import RightContent from "./rightQuizz";
const DetailQuizz = () => {
  const { id } = useParams();
  const [listQues, setListQues] = useState();
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const [kq, setKq] = useState();
  const handleGetDetail = async () => {
    const res = await getDetailQuizz(id);
    if (res && res?.EC == 0) {
      let newData = {};
      const data = _.chain(res?.DT)
        .groupBy("id")
        .map((value, key) => {
          newData.answer = [];
          newData.description = "";
          newData.id = "";
          newData.image = "";
          value.forEach((item, index) => {
            if (index === 0) {
              newData.description = item.description;
              newData.id = item.id;
              if (item.image) {
                newData.image = item.image;
              }
            }
            item.answers.isSelected = false;
            newData.answer.push(item.answers);
          });
          return {
            id: newData.id,
            description: newData.description,
            image: newData.image,
            answers: newData.answer,
          };
        })
        .value();
      setListQues(data);
    }
  };
  useEffect(() => {
    handleGetDetail();
  }, [id]);
  const location = useLocation();
  const prebvios = () => {
    if (count <= 0 && listQues) {
      setCount(listQues.length - 1);
      return;
    }
    setCount(count - 1);
  };
  const nextTo = () => {
    if (listQues && count === listQues.length - 1) {
      setCount(0);
      return;
    }
    setCount(count + 1);
  };
  const checkBox = (questionId, quizId) => {
    const cloneDataQuizz = _.cloneDeep(listQues);
    const currentQuizz = cloneDataQuizz.find((item) => item.id == quizId);
    const newAnswer = currentQuizz.answers.map((item) => {
      if (item.id == questionId) {
        item.isSelected = !item.isSelected;
      }
      return item;
    });
    currentQuizz.answers = newAnswer;
    const index = cloneDataQuizz.findIndex((item) => item.id == quizId);
    cloneDataQuizz[index] = currentQuizz;
    setListQues(cloneDataQuizz);
  };
  const nav = useNavigate();
  const handlerSubmit = async () => {
    let data = {};
    data.quizId = id;
    data.answers = [];
    listQues.forEach((itemQuestion) => {
      const toDo = {};
      toDo.userAnswerId = [];
      toDo.questionId = itemQuestion.id;
      itemQuestion.answers.map((itemAnswer) => {
        if (itemAnswer.isSelected == true) {
          toDo.userAnswerId.push(itemAnswer.id);
        }
      });
      data.answers.push(toDo);
    });
    const res = await subMitAnswer(data);
    setKq(res);
    setShow(true);
    setTimeout(() => {
      nav("/user");
    }, 3000);
  };
  return (
    <div className="container">
      <div className="right">
        <div className="title">{location?.state?.des}</div>
        <>
          <Question
            data={listQues && listQues.length > 0 ? listQues[count] : false}
            checkBox={checkBox}
          />
        </>
        <div className="footer">
          <button className="btn btn-primary" onClick={prebvios}>
            Pre
          </button>
          <button className="btn btn-primary" onClick={nextTo}>
            Next
          </button>
          <button className="btn btn-warning" onClick={handlerSubmit}>
            Finished
          </button>
        </div>
      </div>
      <div className="right-content">
        <RightContent
          data={listQues && listQues.length > 0 ? listQues : false}
          handlerSubmit={handlerSubmit}
          setCount={setCount}
        />
      </div>
      <>
        <Overview show={show} setShow={setShow} kq={kq} />
      </>
    </div>
  );
};
export default DetailQuizz;
