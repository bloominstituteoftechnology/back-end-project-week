import { 
  GET_ALL_NOTES,
  GET_NOTE,
  CREATE_NOTE,
  DELETE_NOTE,
  EDIT_NOTE, 
  ERROR 
} from '../actions';

export default (notes = [], action) => {
  switch (action.type) {
    case GET_ALL_NOTES:
      return action.payload;
    case GET_NOTE:
      return action.payload;
    case CREATE_NOTE:
      return [...notes, action.payload];
    case DELETE_NOTE:
      return [...notes];
    case EDIT_NOTE:
      return [...notes, action.payload];
    case ERROR:
      return {...notes, error: action.payload}
    default:
      return notes;
  }
};