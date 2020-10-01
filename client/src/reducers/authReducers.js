import { FETCH_USER } from "../actions/types";

const INITIAL_STATE = {
  userId: null,
  credits: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER: {
      return {
        ...state,
        userId: action.payload || false,
      };
    }
    default:
      return state;
  }
};
