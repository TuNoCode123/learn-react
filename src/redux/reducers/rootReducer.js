import { combineReducers } from "redux";
import loginUserReducer from "../counter/reducer";
import displayListQuizz from "../counter/displayAllQuizzReducer";
const rootReducer = combineReducers({
  login: loginUserReducer,
  listQuizz: displayListQuizz,
});

export default rootReducer;
