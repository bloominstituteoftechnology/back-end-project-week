import {
  ADD,
  CLEAR_ERROR,
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
        error: null,
        notes: action.payload,
      };
    case ADD:
      return {
        ...state,
        error: null,
        notes: [...state.notes, action.payload]
      };
    case EDIT:
      const editedNote = action.payload;
      return {
        ...state,
        error: null,
        notes: state.notes.map(note => {
          if (note._id == editedNote._id) {
            return editedNote;
          } else {
            return note;
          }
        })
      };
    case ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    case LOGOUT:
      return {
        ...state,
        error: null,
        notes: [],
      };
    case SEARCH:
      return {
        ...state,
        error: null,
        results: action.payload
      }
    default:
      return {
        ...state,
      };
  }
}