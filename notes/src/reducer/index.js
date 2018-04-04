// Action types
import {
  ADD_NOTE,
  NOTES_FETCHED,
  ERROR_FETCHING,
  UPDATE_NOTE,
  TOGGLE_MODAL,
  DELETE_NOTE,
  SELECT_NOTE,
  SORT_NOTES,
  LOGIN_USER,
  LOGOUT_USER,
} from '../actions';

const initialState = {
  notes: [],
  modalVisible: false,
  selectedNote: {},
  sortType: 'id',
  authed: false,
  error: null,
};

const sortNotes = (notes, sortType, prop) => {
  let notesCopy = notes.slice(0);
  if (sortType === prop) return notesCopy.reverse();
  return notesCopy.sort((a,b) => {
    if (a[prop] < b[prop]) return -1;
    if (a[prop] > b[prop]) return 1;
    return 0;
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      const newNote = {
        ...action.payload,
        id: state.id,
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
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map(note => {
          if (note.id !== action.payload.id) return note;
          return action.payload;
        }),
        selectedNote: action.payload
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        modalVisible: !state.modalVisible,
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== state.selectedNote.id),
        modalVisible: !state.modalVisible,
        selectedNote: {},
      };
    case SELECT_NOTE:
      return {
        ...state,
        selectedNote: state.notes.filter(note => note.id === action.payload)[0],
      }
    case SORT_NOTES:
    return {
      ...state,
      notes: sortNotes(state.notes, state.sortType, action.payload),
      sortType: action.payload,
    }
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload.username,
        notes: action.payload.notes,
        authed: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        authed: false,
      };
    default:
      return state;
  }
};

export default reducer;
