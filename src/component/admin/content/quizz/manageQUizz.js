import { useState } from "react";
import CreateQuizz from "./createQuizz";
import Accordion from "react-bootstrap/Accordion";
import TableQuizz from "./tableQuizz";
import ViewQuizz from "./viewAllQuizz";
import DeleteQuizz from "./deleteQuizz";
import UpdateQuizz from "./updateQuizz";
import Assgine from "./assign";
import UpdateQA from "./updateQA";
const ManageQuizz = () => {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [getId, setGetId] = useState();
  const [getQuizzDelete, setgetQuizzDelete] = useState();
  const [quizz, setQuizz] = useState();
  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quizz</Accordion.Header>
          <Accordion.Body>
            <div className="createQuizz">
              <CreateQuizz />
            </div>
            <div className="tableQuizz">
              <TableQuizz
                show={show}
                setShow={setShow}
                setGetId={setGetId}
                showDelete={showDelete}
                setShowDelete={setShowDelete}
                setgetQuizzDelete={setgetQuizzDelete}
                showUpdate={showUpdate}
                setShowUpdate={setShowUpdate}
                setQuizz={setQuizz}
              />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Manager QA</Accordion.Header>
          <Accordion.Body>
            <UpdateQA />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Manager assgine</Accordion.Header>
          <Accordion.Body>
            <Assgine quizz={quizz} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="middle">
        <ViewQuizz show={show} setShow={setShow} getId={getId} />
        <DeleteQuizz
          show={showDelete}
          setShow={setShowDelete}
          getQuizzDelete={getQuizzDelete}
        />
        <UpdateQuizz show={showUpdate} setShow={setShowUpdate} quizz={quizz} />
      </div>
    </>
  );
};
export default ManageQuizz;
