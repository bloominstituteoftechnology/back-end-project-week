import {
  GETTING_NOTES,
  NOTES_FETCHED,
  ERROR_FETCHING_NOTES,
  MAKING_NOTE,
  MAKE_NOTE_SUCCESS,
  MAKE_NOTE_FAILURE,
  DELETING_NOTE,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE,
  UPDATING_NOTE,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE
} from "../actions";

const initialState = {
  notes: [],
  fetchingNotes: false,
  addingNote: false,
  updatingNote: false,
  deletingNote: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_NOTES:
      return {
        ...state,
        fetchingNotes: true
      };
    case NOTES_FETCHED:
      return {
        ...state,
        fetchingNotes: false,
        notes: action.payload
      };
    case ERROR_FETCHING_NOTES:
      return {
        ...state,
        fetchingNotes: false,
        error: action.payload
      };
    case CREATING_NOTE:
      return {
        ...state,
        addingNote: true
      };
    case CREATE_NOTE_SUCCESS:
      return {
        notes: state.notes.concat(action.payload),
        addingNote: false
      };
    case CREATE_NOTE_FAILURE:
      return {
        ...state,
        addingNote: false,
        error: action.payload
      };
    case DELETING_NOTE:
      return {
        ...state,
        deletingNote: true
      };
    case DELETE_NOTE_SUCCESS:
      return {
        ...state,
        notes: action.payload,
        deletingNote: false
      };
    case DELETE_NOTE_FAILURE:
      return {
        ...state,
        deletingNote: false,
        error: action.payload
      };
    case UPDATING_NOTE:
      return {
        ...state,
        updatingNote: true
      };
    case UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        notes: action.payload,
        updatingNote: false
      };
    case UPDATE_NOTE_FAILURE:
      return {
        ...state,
        updatingNote: false,
        error: action.payload
      };
    default:
      return state;
  }
};
