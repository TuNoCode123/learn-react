import { addQuizz, getAllQuizz, login } from "../../services";
import {
  loginSuccess,
  loginRequest,
  loginError,
  loginEnd,
  showlistQuizzRequess,
  showlistQuizzSuccess,
  showlistQuizzError,
  LogOut,
} from "./types";
export const loginUser = (email, passWord) => {
  return async (dispatch) => {
    dispatch(login_Request());
    try {
      const res = await login(email, passWord);
      if (res) {
        dispatch(login_Success(res));
        setTimeout(() => {
          dispatch(login_End());
        }, 1000);
      }
    } catch (error) {
      dispatch(login_Error());
    }
  };
};
export const login_Success = (user) => {
  return {
    type: loginSuccess,
    data: user,
  };
};
export const login_Request = () => {
  return {
    type: loginRequest,
  };
};
export const login_Error = () => {
  return {
    type: loginError,
  };
};
export const login_End = () => {
  return {
    type: loginEnd,
  };
};
export const log_Out = () => {
  return {
    type: LogOut,
  };
};
export const showlistQuizz_Requess = () => {
  return {
    type: showlistQuizzRequess,
  };
};
export const showlistQuizz_Success = (data) => {
  return {
    type: showlistQuizzSuccess,
    payload: data,
  };
};
export const showlistQuizz_Error = () => {
  return {
    type: showlistQuizzError,
  };
};
export const showListQuizz = () => {
  return async (dispatch) => {
    dispatch(showlistQuizz_Requess());
    try {
      const res = await getAllQuizz();
      if (res && res.EC == 0) {
        dispatch(showlistQuizz_Success(res));
      }
    } catch (error) {
      dispatch(showlistQuizz_Error());
    }
  };
};
