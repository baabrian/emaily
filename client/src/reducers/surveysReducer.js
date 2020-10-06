import { FETCH_SURVEYS } from "../actions/types";

const INITIAL_STATE = {
  surveysList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SURVEYS: {
      return {
        ...state,
        surveysList: [...state.surveysList, ...action.payload],
      };
    }
    default:
      return state;
  }
};
