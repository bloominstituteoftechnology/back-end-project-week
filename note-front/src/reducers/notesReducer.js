import { 
  RECIEVING_NOTES, NOTES_RECEIVED, 
  CREATING_NOTE, NOTE_CREATED, 
  DELETING_NOTE, DELETE_NOTE,
  UPDATING_NOTE, UPDATE_NOTE,
  ERROR
} from '../actions';

const initialState = {
  notes: [],
  fetchingNotes: false,
  creatingNote: false,
  deletingNote: false,
  updatingNote: false,
  error: null
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECIEVING_NOTES:
      return { ...state, fetchingNotes: true }; 
    case NOTES_RECEIVED: 
      return { ...state, fetchingNotes: false, notes: action.payload };
    case CREATING_NOTE:
      return { ...state, creatingNote: true };
    case NOTE_CREATED:
      return { ...state, notes: [...state.notes, action.payload], creatingNote: false};
    case UPDATING_NOTE:
      return { ...state, updatingNote: true };
    case UPDATE_NOTE:
      return { ...state, notes: action.payload, updatingNote: false };  
    case DELETING_NOTE:
      return { ...state, deletingNote: true };
    case DELETE_NOTE:
      return { ...state, notes: action.payload, deletingNote: false };  
    case ERROR:
      return{
        ...state,
        fetchingNotes: false,
        creatingNote: false,
        deletingNote: false,
        updatingNote: false,
        error: action.payload
      };
    default:
      return state;
  }
};