import {
  FETCH_NOTES,
  NOTES_FETCHED,
  NOTE_FETCH_ERROR,
  NOTE_ADDED,
  ADD_NOTE,
  NOTE_ADD_ERROR,
  UPDATE_NOTE,
  NOTE_UPDATED,
  NOTE_UPDATE_ERROR,
  DELETE_NOTE,
  NOTE_DELETED,
  NOTE_DELETE_ERROR,
} from '../actions';

const initialState = {
  fetchingNotes: false,
  notesFetched: false,
  addingNote: false,
  noteAdded: false,
  updatingNote: false,
  noteUpdated: false,
  deletingNote: false,
  noteDeleted: false,
  notes: [],
  error: null,
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTES:
      return { ...state, fetchingNotes: true };
    case NOTES_FETCHED:
      return {
        ...state,
        fetchingNotes: false,
        notesFetched: true,
        notes: action.payload,
      };
    case NOTE_FETCH_ERROR:
      return { ...state, error: action.payload };
    case ADD_NOTE:
      return { ...state, addingNote: true };
    case NOTE_ADDED:
      return {
        ...state,
        noteAdded: true,
        addingNote: false,
        notes: action.payload,
      };
    case NOTE_ADD_ERROR:
      return { ...state, error: action.payload };
    case UPDATE_NOTE:
      return { ...state, updatingNote: true };
    case NOTE_UPDATED:
      return {
        ...state,
        updatingNote: false,
        noteUpdated: true,
        notes: action.payload,
      };
    case NOTE_UPDATE_ERROR:
      return { ...state, error: action.payload };
    case DELETE_NOTE:
      return { ...state, deletingNote: true };
    case NOTE_DELETED:
      return {
        ...state,
        deletingNote: false,
        noteDeleted: true,
        notes: action.payload,
      };
    case NOTE_DELETE_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
