import {
  NOTES_FETCH_START,
  NOTES_FETCH_SUCCESS,
  // NOTES_FETCH_ERROR,
  NOTES_FETCH_FINISH,
} from '../actions';

const initialState = [];

export default (notes = initialState, action) => {
  switch (action.type) {
    case NOTES_FETCH_SUCCESS:
      return action.payload;

    // case NOTES_FETCH_ERROR:

    default:
      return notes;
  }
};
