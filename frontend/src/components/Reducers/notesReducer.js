import {
  ADD,
  EDIT,
  ERROR,
  FETCH,
  LOGOUT,
  SEARCH
} from '../Actions';

const initialState = {
  error: null,
  loading: false,
  notes: [],
  results: []
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
    case SEARCH:
      return {
        ...state,
        results: action.payload
      }
    default:
      return {
        ...state,
      };
  }
}