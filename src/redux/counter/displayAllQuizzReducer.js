import {
  showlistQuizzRequess,
  showlistQuizzSuccess,
  showlistQuizzError,
} from "./types";
const INITIAL_STATE = {
  quizzs: [],
};

const displayListQuizz = (state = INITIAL_STATE, action) => {
  switch (action?.type) {
    case showlistQuizzRequess:
      return {
        ...state,
      };

    case showlistQuizzSuccess:
      return {
        ...state,
        quizzs: action.payload,
      };
    case showlistQuizzError:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default displayListQuizz;
