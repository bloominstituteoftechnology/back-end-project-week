import {
  // NOTES_FETCH_START,
  NOTES_FETCH_SUCCESS,
  NOTE_EDIT_SUCCESS,
  NOTE_DELETE_SUCCESS,
  // NOTES_FETCH_ERROR,
  // NOTES_FETCH_FINISH,
} from '../actions';

const initialState = [];

export default (notes = initialState, action) => {
  switch (action.type) {
    case NOTES_FETCH_SUCCESS:
      return action.payload;

    // case NOTES_FETCH_ERROR:
    case NOTE_EDIT_SUCCESS:
      return notes.map(
        note => (note._id === action.payload._id ? action.payload : note),
      );

    case NOTE_DELETE_SUCCESS:
      return notes.filter(note => note._id !== action.payload._id);

    default:
      return notes;
  }
};
