import { Await } from "react-router-dom";
import axios from "../utils/customixeAxios";
const apiAddUser = async (email, password, name, role, img) => {
  const formData = new FormData();
  formData.append("userImage", img);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("username", name);
  formData.append("role", role);
  return await axios.post("participant", formData);
};
const getUser = async () => {
  const response = await axios.get("participant/all");
  return response;
};
const removeUser = async (id) => {
  const response = await axios.delete("participant", { data: { id: id } });
  return response;
};
const updateUser = async (id, name, img) => {
  const formData = new FormData();
  formData.append("userImage", img);
  formData.append("id", id);
  formData.append("username", name);
  return await axios.put("participant", formData);
};
const paginateUser = async (limit, offset) => {
  try {
    limit = limit ? limit : (limit = 2);
    offset = offset ? offset : (offset = 1);
    return await axios.get("/participant", {
      params: {
        limit: limit,
        page: offset,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const login = async (email, passWord) => {
  try {
    const data = {
      password: passWord,
      email: email,
    };
    return await axios.post("login", {
      ...data,
    });
  } catch (error) {
    console.log(error);
  }
};
const singUp = async (email, passWord, username) => {
  try {
    const data = {
      password: passWord,
      email: email,
      username,
    };
    return await axios.post("register", {
      ...data,
    });
  } catch (error) {}
};
const getQuizz = async () => {
  return await axios.get("/quiz-by-participant");
};
const getDetailQuizz = async (id) => {
  return await axios.get(`questions-by-quiz?quizId=${+id}`);
};
const subMitAnswer = async (data) => {
  return await axios.post("/quiz-submit", data);
};
const addQuizz = async (description, name, difficulty, quizImage) => {
  const formData = new FormData();
  formData.append("description", description);
  formData.append("name", name);
  formData.append("difficulty", difficulty);
  formData.append("quizImage", quizImage);
  return await axios.post("quiz", formData);
};
const getAllQuizz = async () => {
  return await axios.get("/quiz/all");
};
const deleteQuizz = async (id) => {
  return await axios.delete(`quiz/${id}`);
};
const updateQuizz = async (
  id,
  description,
  name,
  difficulty,
  quizImage,
  difficultyReal
) => {
  difficulty = difficulty ? difficulty : difficultyReal;
  const formData = new FormData();
  formData.append("id", id);
  formData.append("description", description);
  formData.append("name", name);
  formData.append("difficulty", difficulty);
  formData.append("quizImage", quizImage);
  return await axios.put("quiz", formData);
};
const createQuestionforQuizz = async (quiz_id, description, questionImage) => {
  const formData = new FormData();
  formData.append("quiz_id", quiz_id);
  formData.append("description", description);
  formData.append("questionImage", questionImage);
  return await axios.post("question", formData);
};
const createAnsweForQuestion = async (
  question_id,
  description,
  correct_answer
) => {
  return await axios.post("answer", {
    question_id,
    description,
    correct_answer,
  });
};
const assgineQU = async (quizId, userId) => {
  return await axios.post("quiz-assign-to-user", {
    quizId,
    userId,
  });
};
const getQA = async (id) => {
  return await axios.get(`quiz-with-qa/${id}`);
};
const updateQA = async (quizId, questions) => {
  return await axios.post("quiz-upsert-qa", {
    quizId,
    questions,
  });
};
const logOut = async (email, refresh_token) => {
  return await axios.post("logout", {
    email,
    refresh_token,
  });
};
const changePass = async (current_password, new_password) => {
  return await axios.post("change-password", {
    current_password,
    new_password,
  });
};
const getOverView = async () => {
  return await axios.get("overview");
};
export {
  apiAddUser,
  getUser,
  removeUser,
  updateUser,
  paginateUser,
  login,
  singUp,
  getQuizz,
  getDetailQuizz,
  subMitAnswer,
  addQuizz,
  getAllQuizz,
  deleteQuizz,
  updateQuizz,
  createQuestionforQuizz,
  createAnsweForQuestion,
  assgineQU,
  getQA,
  updateQA,
  logOut,
  changePass,
  getOverView,
};
