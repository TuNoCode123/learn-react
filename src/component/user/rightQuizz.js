import { useRef } from "react";
import { useEffect, useState } from "react";

const RightContent = (props) => {
  const { data, setCount } = props;
  const [clock, setClock] = useState(300);
  const inputRef = useRef([]);
  useEffect(() => {
    if (clock == 0) {
      props.handlerSubmit();
      return;
    }
    let timer = setInterval(() => {
      setClock(clock - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [clock]);
  function pad(num) {
    return ("0" + num).slice(-2);
  }
  function hhmmss(secs) {
    var minutes = Math.floor(secs / 60);
    secs = secs % 60;
    var hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  }
  const handleClickForAnswers = (data, index) => {
    const currentQuestion = inputRef.current[index];
    if (currentQuestion.className == "question selected") {
      for (let i = 0; i < data.length; i++) {
        if (inputRef.current[i].className != "question selected") {
          inputRef.current[i].className = "question";
        }
      }
      setCount(index);
      return;
    }
    for (let i = 0; i < data.length; i++) {
      if (inputRef.current[i].className != "question selected") {
        inputRef.current[i].className = "question";
      }
    }
    currentQuestion.className = "question clicked";
    setCount(index);
  };
  const generateClassName = (question) => {
    const isAnswer = question.answers.find((item) => item.isSelected == true);
    if (isAnswer) {
      return "question selected";
    }
    return "question";
  };
  return (
    <>
      <div className="clock">{hhmmss(clock)}</div>
      <hr></hr>
      <div className="list-answer">
        {data &&
          data?.map((item, index) => {
            return (
              <div
                key={index}
                ref={(el) => (inputRef.current[index] = el)}
                className={generateClassName(item)}
                onClick={() => handleClickForAnswers(data, index)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};
export default RightContent;
