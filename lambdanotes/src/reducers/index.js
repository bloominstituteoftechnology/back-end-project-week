import * as AT from '../Components/actions/index';

const initialState = {
  getNote: false,
  createNote: false,
  deletingNote: false,
  error: null,
  note: []
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.FETCHING_NOTE:
      return Object.assign({}, state, {
        getNote: true });
    case AT.SUCCESS_NOTE:
      return Object.assign({}, state, {
        getNote: false,
        error: null,
        note: action.payload
      });
      case AT.CREATE_NOTE:
        return Object.assign({}, state, {
           createNote: true });
    case AT.ERROR:
      return Object.assign({}, state, {
        createNote: false,
        getNote: false,
        error: action.payload
      });
      case AT.DELETING_NOTE:
        return Object.assign({}, state, {deletingNote: true });
      case AT.SUCCESS_DELETING:
        return Object.assign({}, state, {
          deletingNote: false,
          error: null,
          note: action.payload
      })
    default:
      return state;
  }
};

export default noteReducer;
