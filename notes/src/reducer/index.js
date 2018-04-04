// Action types
import {
  NOTES_FETCHED,
  ERROR_FETCHING,
  ERROR_ADDING_NOTE,
  UPDATE_ERROR,
  TOGGLE_MODAL,
  DELETE_NOTE,
  DELETE_ERROR,
  SELECT_NOTE,
  SORT_NOTES,
  LOGOUT_USER,
  REGISTER_ERROR,
  USER_LOGGED_IN,
  LOGIN_ERROR,
} from '../actions';

const initialState = {
  notes: [],
  modalVisible: false,
  selectedNote: {},
  sortType: 'id',
  loggedIn: false,
  error: null,
};

const sortNotes = (notes, sortType, prop) => {
  let notesCopy = notes.slice(0);
  if (sortType === prop) return notesCopy.reverse();
  return notesCopy.sort((a, b) => {
    if (a[prop] < b[prop]) return -1;
    if (a[prop] > b[prop]) return 1;
    return 0;
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_ADDING_NOTE:
      return {
        ...state,
        error: action.payload,
      };
    case NOTES_FETCHED:
      return {
        ...state,
        notes: action.payload,
      };
    case ERROR_FETCHING:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        modalVisible: !state.modalVisible,
      };
    case DELETE_NOTE:
      return {
        ...state,
        modalVisible: !state.modalVisible,
        selectedNote: {},
      };
    case DELETE_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case SELECT_NOTE:
      return {
        ...state,
        selectedNote: state.notes.filter(note => note._id === action.payload)[0],
      };
    case SORT_NOTES:
      return {
        ...state,
        notes: sortNotes(state.notes, state.sortType, action.payload),
        sortType: action.payload,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case USER_LOGGED_IN:
      return {
        ...state,
        notes: action.payload.notes,
        loggedIn: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loggingIn: false,
        error: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default reducer;
