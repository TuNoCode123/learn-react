import { useEffect } from "react";
import { getQuizz } from "../../services";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Quizz = (props) => {
  const [listQuizz, setListQuizz] = useState();
  const getQUizzs = async () => {
    const res = await getQuizz();
    setListQuizz(res?.DT);
  };
  useEffect(() => {
    getQUizzs();
  }, []);
  const nav = useNavigate();
  return (
    <>
      {listQuizz ? (
        <div className="container d-flex justify-content-around flex-wrap mt-3">
          {listQuizz &&
            listQuizz.length > 0 &&
            listQuizz.map((data, index) => {
              return (
                <div className="card" style={{ width: "20rem" }}>
                  <img
                    src={`data:image/jpeg;base64,${data.image}`}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <p className="title">Quizz {data.id}</p>
                    <p className="card-text">{data.description}</p>

                    <p
                      onClick={() =>
                        nav(`/quizz/${data.id}`, {
                          state: { des: `${data.description}` },
                        })
                      }
                      className="btn btn-primary"
                    >
                      Start
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        "loading..."
      )}
      {/* <div className="container d-flex justify-content-around flex-wrap mt-3">
        {listQuizz &&
          listQuizz.length > 0 &&
          listQuizz.map((data, index) => {
            return (
              <div className="card" style={{ width: "20rem" }}>
                <img
                  src={`data:image/jpeg;base64,${data.image}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <p className="title">Quizz {data.id}</p>
                  <p className="card-text">{data.description}</p>

                  <p
                    onClick={() =>
                      nav(`/quizz/${data.id}`, {
                        state: { des: `${data.description}` },
                      })
                    }
                    className="btn btn-primary"
                  >
                    Start
                  </p>
                </div>
              </div>
            );
          })}
      </div> */}
    </>
  );
};
export default Quizz;
