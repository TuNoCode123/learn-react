const Question = (props) => {
  const { data, checkBox } = props;
  const handlercheckBox = (questionId, quizzId) => {
    checkBox(questionId, quizzId);
  };
  return (
    <div className="body">
      {data && (
        <>
          <div className="image mt-2">
            {data.image && (
              <img
                className="img"
                src={`data:image/jpeg;base64,${data.image}`}
              ></img>
            )}
          </div>
          <div className="qs-title">
            <span className="ml-2 number">{data.id} .</span>
            {data.description}
          </div>
          <div className="qs">
            {data.answers.map((answer) => {
              return (
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    checked={answer.isSelected}
                    onChange={() => handlercheckBox(answer.id, data.id)}
                  />
                  <label class="form-check-label">{answer.description}</label>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default Question;
