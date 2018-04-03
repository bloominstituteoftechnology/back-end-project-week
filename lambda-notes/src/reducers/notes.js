import { GET_NOTES } from '../actions';

export default (notes = [], action) => {
  switch (action.type) {
    case GET_NOTES:
      return action.payload;
    default:
      return notes;
  }
};