import {
  ADD,
  EDIT,
  ERROR,
  FETCH,
  LOGOUT,
} from '../Actions';

const initialState = {
  notes: [],
  loading: false,
  error: null,
}

export const notesReducer = ( state = initialState, action ) => {
  switch(action.type) {
    case FETCH:
      return {
        ...state,
        notes: action.payload,
      };
    case ADD:
    case EDIT:
      return {
        ...state,
        notes: [...state.notes, action.payload]
      };
    case ERROR:
      return {
        ...state,
        error: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        notes: [],
      };
    default:
      return {
        ...state,
      };
  }
}