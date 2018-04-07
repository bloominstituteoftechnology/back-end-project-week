import { SINGLE_NOTE, TOGGLE_UPDATE_NOTE } from "../actions";

const initialState = {
  noteSelected: {},
  showUpdate: false
};

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SINGLE_NOTE:
      return { ...state, noteSelected: action.payload, showUpdate: false };
    case TOGGLE_UPDATE_NOTE:
      return { ...state, showUpdate: !state.showUpdate };
    default:
      return state;
  }
};
