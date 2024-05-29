import { useEffect, useState } from "react";
import Select from "react-select";
import { RiImageAddFill } from "react-icons/ri";
import { MdAddBox } from "react-icons/md";
import { IoRemoveCircle } from "react-icons/io5";
import Checkbox from "rc-checkbox";
import { v4 as uuidv4 } from "uuid";
import "./qs.css";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { showListQuizz } from "../../../../redux/counter/actions";
import {
  createAnsweForQuestion,
  createQuestionforQuizz,
} from "../../../../services";
import { toast } from "react-toastify";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
const ManagerQuestion = () => {
  const options = [];
  const [quizz, setQuizz] = useState();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const listOptionsQuizz = useSelector((state) => state.listQuizz.quizzs);
  listOptionsQuizz &&
    listOptionsQuizz?.DT.map((item) => {
      const temp = {};
      temp.value = item?.id;
      temp.label = `${item.id} - ${item?.description}`;
      options.push(temp);
    });
  useEffect(() => {
    dispatch(showListQuizz());
  }, []);
  const [data, setData] = useState([
    {
      desciption: "",
      image: "",
      fileName: "",
      idQuestion: uuidv4(),
      answers: [
        {
          idAnswer: uuidv4(),
          aswerDesciption: "",
          isCorrect: false,
        },
      ],
    },
  ]);
  const addQuestion = () => {
    const temp = {
      desciption: "",
      image: "",
      fileName: "",
      idQuestion: uuidv4(),
      answers: [
        {
          idAnswer: uuidv4(),
          aswerDesciption: "",
          isCorrect: false,
        },
      ],
    };
    setData([...data, temp]);
  };
  const RemoveQuestion = (id) => {
    const cloneListQuestion = _.cloneDeep(data);
    const newlistQuestion = cloneListQuestion.filter(
      (item) => item.idQuestion != id
    );
    setData([...newlistQuestion]);
  };
  const addAnswer = (id) => {
    const answer = {
      idAnswer: uuidv4(),
      aswerDesciption: "",
      isCorrect: false,
    };
    const cloneListQuestion = _.cloneDeep(data);
    const newlistQuestion = cloneListQuestion.map((item) => {
      if (item.idQuestion === id) {
        item.answers.push(answer);
      }
      return item;
    });
    setData([...newlistQuestion]);
  };
  const removeAswers = (idQuestion, idAnswer) => {
    const cloneListQuestion = _.cloneDeep(data);
    const foundQuestion = cloneListQuestion.find(
      (item) => item.idQuestion == idQuestion
    );
    const listAnswerNew = foundQuestion.answers.filter(
      (item) => item.idAnswer != idAnswer
    );
    const index = cloneListQuestion.findIndex(
      (item) => item.idQuestion == idQuestion
    );
    cloneListQuestion[index].answers = listAnswerNew;
    setData([...cloneListQuestion]);
  };
  const handleGenerateQuestion = (type, idQuestion, value) => {
    const cloneListQuestion = _.cloneDeep(data);
    const newlistQuestion = cloneListQuestion.map((item, index) => {
      if (item.idQuestion == idQuestion) {
        if (type === "QUESTION") {
          item.desciption = value;
        }
        if (type === "IMAGINE") {
          item.image = value;
          item.fileName = value?.name;
        }
      }
      return item;
    });
    setData([...newlistQuestion]);
  };
  const handleGenerateAnswers = (type, idQuestion, idAnswer, value) => {
    const cloneListQuestion = _.cloneDeep(data);
    const foundQuestion = cloneListQuestion.find(
      (item) => item.idQuestion == idQuestion
    );
    const foundAnswer = foundQuestion.answers.find(
      (item) => item.idAnswer == idAnswer
    );
    if (type == "ANSWER") {
      foundAnswer.aswerDesciption = value;
    }
    if (type == "CHECKBOX") {
      foundAnswer.isCorrect = value;
    }
    const index = foundQuestion.answers.findIndex(
      (item) => item.idAnswer == idAnswer
    );
    foundQuestion.answers[index] = foundAnswer;
    const indexQ = cloneListQuestion.findIndex(
      (item) => item.idQuestion == idQuestion
    );
    cloneListQuestion[indexQ] = foundQuestion;
    setData([...cloneListQuestion]);
  };
  const handleSubmit = async () => {
    if (!quizz) {
      toast.error("you dont select a any quizz");
      return;
    }
    let tmp = 0;
    let rankQ = 0;
    for (let i = 0; i < data.length; i++) {
      if (!data[i].desciption) {
        tmp = 1;
        rankQ = i + 1;
        break;
      }
    }
    if (tmp == 1) {
      toast.error(`have not any description in Question's ${rankQ}`);
      return;
    }
    let rankanwer = 0;
    let q = 0;
    let tmpA = 0;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].answers.length; j++) {
        if (!data[i].answers[j].aswerDesciption) {
          tmpA = 1;
          rankanwer = j + 1;
          q = i + 1;
          break;
        }
      }
      if (tmpA == 1) {
        toast.error(`empty at Question's ${q} and Answer ${rankanwer}`);
        return;
      }
    }
    for (let i = 0; i < data.length; i++) {
      let dem = 0;
      for (let j = 0; j < data[i].answers.length; j++) {
        if (data[i].answers[i].isCorrect) {
          ++dem;
        }
      }
      if (dem == 0) {
        toast.error(`question's ${i + 1} phải có ít nhất một đáp án đúng`);
        return;
      }
    }
    Promise.all(
      data.map(async (item, index) => {
        const res = await createQuestionforQuizz(
          quizz?.value,
          item?.desciption,
          item?.image
        );
        res &&
          res.EC == 0 &&
          item.answers.map(async (answer) => {
            await createAnsweForQuestion(
              res.DT.id,
              answer.aswerDesciption,
              answer.isCorrect
            );
          });
      })
    );
    toast.success("Created Question and Answer succed");
  };
  const [src, setSrc] = useState();
  const previewImg = (link) => {
    setSrc(URL.createObjectURL(link));
    setShow(true);
  };
  return (
    <div className="manager-question p-2">
      <div className="header" style={{ fontWeight: "900", fontSize: "20px" }}>
        Manager Question
      </div>
      <hr className="mt-3 mb-3"></hr>
      <div className="select-quizz col-6 mb-3">
        <div className="mb-2">Select Quizz:</div>
        <Select
          defaultValue={quizz}
          onChange={setQuizz}
          options={options ? options : []}
        />
      </div>
      <div className="q-body">
        <div className="mb-3">Add Question:</div>
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <>
                <div className="q-answer mb-3">
                  <div className="question">
                    <div class="form-floating mb-3 q">
                      <input
                        type="text"
                        class="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        value={item.desciption}
                        onChange={(event) =>
                          handleGenerateQuestion(
                            "QUESTION",
                            item.idQuestion,
                            event.target.value
                          )
                        }
                      />
                      <label for="floatingPassword">
                        Question's Description
                      </label>
                    </div>
                    <div className="ar">
                      <div>
                        <label
                          htmlFor={item.idQuestion}
                          className="form-label plus"
                        >
                          <RiImageAddFill />
                        </label>
                        {item.fileName ? (
                          <>
                            <span onClick={() => previewImg(item.image)}>
                              {item.fileName}
                            </span>
                          </>
                        ) : (
                          <>
                            <span>0 file is uploaded</span>
                          </>
                        )}
                        <input
                          type="file"
                          id={item.idQuestion}
                          onChange={(event) =>
                            handleGenerateQuestion(
                              "IMAGINE",
                              item.idQuestion,
                              event.target.files[0]
                            )
                          }
                          hidden
                        />
                      </div>
                      <div className="add-img" onClick={addQuestion}>
                        <MdAddBox />
                      </div>
                      <div
                        className="remove-img"
                        onClick={() => RemoveQuestion(item.idQuestion)}
                      >
                        {data.length > 1 && <IoRemoveCircle />}
                      </div>
                    </div>
                  </div>
                  <div className="answers">
                    {item?.answers.map((answer) => {
                      return (
                        <>
                          <div class="answer mb-2">
                            <Checkbox
                              onChange={(event) =>
                                handleGenerateAnswers(
                                  "CHECKBOX",
                                  item.idQuestion,
                                  answer.idAnswer,
                                  event.target.checked
                                )
                              }
                            />
                            <div class="form-floating ans">
                              <input
                                type="text"
                                class="form-control"
                                id={answer.idAnswer}
                                placeholder="Password"
                                value={answer.aswerDesciption}
                                onChange={(event) =>
                                  handleGenerateAnswers(
                                    "ANSWER",
                                    item.idQuestion,
                                    answer.idAnswer,
                                    event.target.value,
                                    answer
                                  )
                                }
                              />
                              <label for={answer.idAnswer}>answer</label>
                            </div>
                            <div
                              className="add-a"
                              onClick={() => addAnswer(item.idQuestion)}
                            >
                              <MdAddBox />
                            </div>
                            <div
                              className="remove-a"
                              onClick={() =>
                                removeAswers(item.idQuestion, answer.idAnswer)
                              }
                            >
                              {item?.answers.length > 1 && <IoRemoveCircle />}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })}
        <hr></hr>
        <div>
          <button className="btn btn-warning" onClick={handleSubmit}>
            Submit
          </button>
          <>
            {show && (
              <Lightbox mainSrc={src} onCloseRequest={() => setShow(false)} />
            )}
          </>
        </div>
      </div>
    </div>
  );
};
export default ManagerQuestion;
