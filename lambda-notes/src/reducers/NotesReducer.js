import { 
  CREATE_NOTE, 
  EDIT_NOTE, 
  DELETE_NOTE,
  GET_NOTES, 
  TOGGLE_DELETE } from '../actions';

  // import testerNotes from '../dummyData';

let _id = -1;

const initialState = {
  // modal: { 
  //   showing: false, 
  //   deleteId: null 
  // },
  // notes: [{ 
  //   title: 'Note Title', 
  //   content: 'Note Content', 
  //   id: 0 }]
  notes: [],
  id: _id,
  createNote: false,
  editNote: false,
  deleteNote: false,
  getNotes: false
};

export const notes = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE:
      // return  [ ...state, action.payload ];
      return {
        ...state,
        notes: [...state.notes, action.payload],
        createNote: true
      };
    case EDIT_NOTE:
      // const newState = state.map((note) => {
      //   if (note._id === action.payload._id) {
      //     return action.payload;
      //   }
      //   return note;
      // });
      // return newState;
      return {
        ...state,
        notes: [...state.notes].map((note) => {
          if (note._id === action.payload._id) {
            return action.payload;
          }
          return note;
        }),
        editNote: true
      };
    case DELETE_NOTE:
      // return state.filter((note) => {
      //   return note._id !== action.payload;
      // });
      return {
        ...state,
        notes: [...state.notes].filter((note) => {
          return note._id !== action.payload;
        }),
        deleteNote: true
      };
    case GET_NOTES:
      // return action.payload;
      return {
        ...state,
        notes: [...state.notes, ...action.payload],
        getNotes: true
      }
    default:
      return state;
  }
};

const initialModal = { showing: false, deleteId: null };

export const modal = (state = initialModal, action) => {
  switch(action.type) {
    case TOGGLE_DELETE:
      return { ...state, showing: !state.showing, deleteId: action.payload };
    case DELETE_NOTE:
      return { ...state, showing: !state.showing, deleteId: null };
    default:
      return state;
  }
};