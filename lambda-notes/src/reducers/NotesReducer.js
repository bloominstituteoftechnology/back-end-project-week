import { 
  CREATED_NOTE,
  CREATING_NOTE, 
  EDITED_NOTE,
  EDITING_NOTE, 
  DELETED_NOTE,
  DELETING_NOTE,
  FETCHED_NOTES,
  FETCHING_NOTES, 
  TOGGLE_DELETE,
  NOTES_ERROR
 } from '../actions';

  // import testerNotes from '../dummyData';

const initialState = {
  modal: { 
    showing: false, 
    deleteId: null 
  },
  // notes: [{ 
  //   title: 'Note Title', 
  //   content: 'Note Content', 
  //   id: 0 }]
  notes: [],
  creatingNote: false,
  editingNote: false,
  deletingNote: false,
  fetchingNotes: false,
  error: null
};

export const notes = (state = initialState, action) => {
  switch (action.type) {
    case CREATING_NOTE:
      return {
        ...state,
        creatingNote: true
      };
    case CREATED_NOTE:
      return {
        notes: state.notes.concat(action.payload),
        creatingNote: false
      };
    case EDITING_NOTE:
      return {
        ...state,
        editingNote: true
      };
    case EDITED_NOTE:
      // const newState = state.map((note) => {
      //   if (note._id === action.payload._id) {
      //     return action.payload;
      //   }
      //   return note;
      // });
      // return newState;
      return {
        ...state,
        notes: action.payload,
        editingNote: false
      };
    case DELETING_NOTE:
      return {
        ...state,
        deletingNote: true
      };
    case DELETED_NOTE:
      // return state.filter((note) => {
      //   return note._id !== action.payload;
      // });
      return {
        ...state,
        notes: action.payload,
        deletingNote: false
      };
    case FETCHING_NOTES:
      return {
        ...state,
        fetchingNotes: true
      };
    case FETCHED_NOTES:
      return {
        ...state,
        notes: action.payload,
        fetchingNotes: false
      };
    case NOTES_ERROR:
      return {
        ...state,
        fetchingNotes: false,
        creatingNote: false,
        editingNote: false,
        deletingNote: false,
        error: action.payload
      };
    default:
      return state;
  }
};

const initialModal = { showing: false, deleteId: null };

export const modal = (state = initialModal, action) => {
  switch(action.type) {
    case TOGGLE_DELETE:
      return { ...state, showing: !state.showing, deleteId: action.payload };
    case DELETED_NOTE:
      return { ...state, showing: !state.showing, deleteId: null };
    default:
      return state;
  }
};