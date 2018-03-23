import { BY_TAG, BY_TEXT } from "../actions/filterActions";

export const filterState = {
  notes: []
};

export const filterReducer = (state = filterState, action) => {
  switch (action.type) {
    case BY_TAG:
      return { ...state, notes: action.payload };
    case BY_TEXT:
      return {
        ...state,
        notes: action.payload
      };
    default:
      return state;
  }
};
