import { useEffect, useState } from "react";
import Select from "react-select";
import { RiImageAddFill } from "react-icons/ri";
import { MdAddBox } from "react-icons/md";
import { IoRemoveCircle } from "react-icons/io5";
import Checkbox from "rc-checkbox";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { showListQuizz } from "../../../../redux/counter/actions";
import {
  createAnsweForQuestion,
  createQuestionforQuizz,
  getQA,
  updateQA,
} from "../../../../services";
import { toast } from "react-toastify";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
const UpdateQA = () => {
  const options = [];
  const [quizz, setQuizz] = useState();
  const [show, setShow] = useState(false);
  const [img, setImg] = useState();
  const dispatch = useDispatch();
  const listOptionsQuizz = useSelector((state) => state.listQuizz.quizzs);
  listOptionsQuizz &&
    listOptionsQuizz?.DT?.map((item) => {
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
      description: "",
      imageFile: "",
      imageName: "",
      id: uuidv4(),
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ]);
  const addQuestion = () => {
    const temp = {
      description: "",
      imageFile: "",
      imageName: "",
      id: uuidv4(),
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    };
    setData([...data, temp]);
  };
  const RemoveQuestion = (id) => {
    const cloneListQuestion = _.cloneDeep(data);
    const newlistQuestion = cloneListQuestion.filter((item) => item.id != id);
    setData([...newlistQuestion]);
  };
  const addAnswer = (id) => {
    const answer = {
      id: uuidv4(),
      description: "",
      isCorrect: false,
    };
    const cloneListQuestion = _.cloneDeep(data);
    const newlistQuestion = cloneListQuestion.map((item) => {
      if (item.id === id) {
        item.answers.push(answer);
      }
      return item;
    });
    setData([...newlistQuestion]);
  };
  const removeAswers = (idQuestion, idAnswer) => {
    const cloneListQuestion = _.cloneDeep(data);
    const foundQuestion = cloneListQuestion.find(
      (item) => item.id == idQuestion
    );
    const listAnswerNew = foundQuestion.answers.filter(
      (item) => item.id != idAnswer
    );
    const index = cloneListQuestion.findIndex((item) => item.id == idQuestion);
    cloneListQuestion[index].answers = listAnswerNew;
    setData([...cloneListQuestion]);
  };
  const handleGenerateQuestion = (type, idQuestion, value) => {
    const cloneListQuestion = _.cloneDeep(data);
    const newlistQuestion = cloneListQuestion.map((item, index) => {
      if (item.id == idQuestion) {
        if (type === "QUESTION") {
          item.description = value;
        }
        if (type === "IMAGINE") {
          item.imageFile = value;
          item.imageName = value?.name;
        }
      }
      return item;
    });
    setData([...newlistQuestion]);
  };
  const handleGenerateAnswers = (type, idQuestion, idAnswer, value) => {
    const cloneListQuestion = _.cloneDeep(data);
    const foundQuestion = cloneListQuestion.find(
      (item) => item.id == idQuestion
    );
    const foundAnswer = foundQuestion?.answers.find(
      (item) => item.id == idAnswer
    );
    if (type == "ANSWER") {
      foundAnswer.description = value;
    }
    if (type == "CHECKBOX") {
      foundAnswer.isCorrect = value;
    }
    const index = foundQuestion.answers.findIndex(
      (item) => item.id == idAnswer
    );
    foundQuestion.answers[index] = foundAnswer;
    const indexQ = cloneListQuestion.findIndex((item) => item.id == idQuestion);
    cloneListQuestion[indexQ] = foundQuestion;
    setData([...cloneListQuestion]);
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  const handleSubmit = async () => {
    if (!quizz) {
      toast.error("you dont select a any quizz");
      return;
    }
    let tmp = 0;
    let rankQ = 0;
    for (let i = 0; i < data.length; i++) {
      if (!data[i].description) {
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
        if (!data[i].answers[j].description) {
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
        if (data[i].answers[j].isCorrect) {
          ++dem;
        }
      }
      if (dem == 0) {
        toast.error(`question's ${i + 1} phải có ít nhất một đáp án đúng`);
        return;
      }
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].imageFile) {
        data[i].imageFile = await toBase64(data[i].imageFile);
      }
    }

    const rs = await updateQA(quizz.value, data);
    if (rs.EC == 0) {
      toast.success(rs.EM);
      return;
    }
    toast.error(rs.EM);
  };
  const [src, setSrc] = useState();
  const previewImg = (link) => {
    setSrc(URL.createObjectURL(link));
    setShow(true);
  };

  function urltoFile(url, filename, mimeType) {
    if (url.startsWith("data:")) {
      var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  }

  const handleGetQA = async (id) => {
    const rs = await getQA(id);
    const newdata = [];
    for (let i = 0; i < rs.DT.qa.length; i++) {
      let tempQ = rs.DT.qa[i];
      if (tempQ.imageFile) {
        tempQ.imageFile = await urltoFile(
          `data:image/png;base64,${tempQ.imageFile}`,
          `Question - ${tempQ.id}`,
          "image/png"
        );
      }
      newdata.push(tempQ);
    }
    setData(newdata);
  };
  useEffect(() => {
    quizz && handleGetQA(quizz?.value);
  }, [quizz?.value]);
  return (
    <div className="manager-question p-2">
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
                        value={item.description}
                        onChange={(event) =>
                          handleGenerateQuestion(
                            "QUESTION",
                            item.id,
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
                        <label htmlFor={item.id} className="form-label plus">
                          <RiImageAddFill />
                        </label>
                        {item?.imageFile ? (
                          <>
                            <span onClick={() => previewImg(item?.imageFile)}>
                              {item?.imageFile.name}
                            </span>
                          </>
                        ) : (
                          <>
                            <span>0 file is uploaded</span>
                          </>
                        )}
                        <input
                          type="file"
                          id={item.id}
                          onChange={(event) =>
                            handleGenerateQuestion(
                              "IMAGINE",
                              item.id,
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
                        onClick={() => RemoveQuestion(item.id)}
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
                              defaultChecked={answer.isCorrect}
                              onChange={(event) =>
                                handleGenerateAnswers(
                                  "CHECKBOX",
                                  item.id,
                                  answer.id,
                                  event.target.checked
                                )
                              }
                            />
                            <div class="form-floating ans">
                              <input
                                type="text"
                                class="form-control"
                                id={answer.id}
                                placeholder="Password"
                                value={answer.description}
                                onChange={(event) =>
                                  handleGenerateAnswers(
                                    "ANSWER",
                                    item.id,
                                    answer.id,
                                    event.target.value,
                                    answer
                                  )
                                }
                              />
                              <label for={answer.id}>answer</label>
                            </div>
                            <div
                              className="add-a"
                              onClick={() => addAnswer(item.id)}
                            >
                              <MdAddBox />
                            </div>
                            <div
                              className="remove-a"
                              onClick={() => removeAswers(item.id, answer.id)}
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
export default UpdateQA;
