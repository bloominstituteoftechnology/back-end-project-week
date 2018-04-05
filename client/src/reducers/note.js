import { ADD_NOTE, VIEW_NOTE, EDIT_NOTE, DELETE_NOTE } from '../actions';

const initialState = {
  notes: [],
};

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return { ...state };

    case VIEW_NOTE:
      return { ...state, current: action.payload };

    case EDIT_NOTE:
      return {
        ...state,
        notes: [...state.notes].map(note => {
          if (note._id !== action.payload.data._id) {
            return note;
          }
          return action.payload.data;
        }),
      };

    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note._id !== action.payload.data._id),
      };

    default:
      return state;
  }
};

export default noteReducer;
