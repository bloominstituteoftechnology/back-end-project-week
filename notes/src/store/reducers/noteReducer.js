import {
  LOADING,
  GET_NOTES,
  ERROR,
  UPDATE_NOTE,
  CREATE_NOTE,
  DELETE,
  GET_NOTE
} from "../actions/noteActions";
const initState = {
  notes: []
  // fetchingNotes: false,
  // addingNotes: false,
  // updatingNotes: false,
  // deletingNotes: false,
  // error: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOADING:
      return Object.assign({}, state, { loading: true });
    case GET_NOTES:
      return Object.assign({}, state, {
        notes: action.notes,
        loading: false,
        error: "error"
      });
    case GET_NOTE:
      return Object.assign({}, state, {
        notes: action.notes,
        loading: false,
        error: "error"
      });
    case UPDATE_NOTE:
      return Object.assign({}, state, {
        notes: action.notes,
        loading: false,
        error: "error"
      });
    case CREATE_NOTE:
      return Object.assign({}, state, {
        notes: action.notes,
        loading: false,
        error: "error"
      });

    case DELETE:
      return Object.assign({}, state, {
        notes: action.notes,
        loading: false,
        error: "error"
      });
    case ERROR:
      return Object.assign({}, state, {
        error: action.errorMessage,
        loading: false
      });
    default:
      return state;
  }
};
