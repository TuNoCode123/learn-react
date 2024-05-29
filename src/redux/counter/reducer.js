import {
  loginSuccess,
  loginRequest,
  loginError,
  loginEnd,
  LogOut,
} from "./types";
const INITIAL_STATE = {
  user: "",
  stage: "",
  description: "",
  isloading: true,
  accessToken: "",
};

const loginUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case loginRequest:
      return {
        ...state,
        isloading: true,
      };

    case loginSuccess:
      return {
        ...state,
        user: action.data.DT.email,
        accessToken: action.data.DT.access_token,
        stage: action.data.EC,
        description: action.data.EM,
        isloading: true,
      };
    case loginError:
      return {
        ...state,
        stage: action.data.EC,
        description: action.data.EM,
      };
    case loginEnd:
      return {
        ...state,
        isloading: false,
      };
    case LogOut:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default loginUserReducer;
