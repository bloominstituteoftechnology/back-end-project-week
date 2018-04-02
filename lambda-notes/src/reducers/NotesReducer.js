import { GET_ALL_NOTES, ERROR } from '../actions';

export default (notes = [], action) => {
  switch (action.type) {
    case GET_ALL_NOTES:
      return action.payload;
    case ERROR:
      return {...notes, error: action.payload}
    default:
      return notes;
  }
};