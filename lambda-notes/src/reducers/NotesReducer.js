import { CREATE_NOTE, EDIT_NOTE, DELETE_NOTE, TOGGLE_DELETE } from '../actions';
import { GET_NOTES } from '../actions';
// import testerNotes from '../dummyData';

// const initialState = {
//   modal: { 
//     showing: false, 
//     deleteId: null 
//   },
//   notes: [{ 
//     title: 'Note Title', 
//     content: 'Note Content', 
//     id: 0 }]
// };

export const notes = (state = [], action) => {
  switch (action.type) {
    case CREATE_NOTE:
      return  [ ...state, action.payload ];
    case EDIT_NOTE:
      const newState = state.map((note) => {
        if (note._id === action.payload._id) {
          return action.payload;
        }
        return note;
      });
      return newState;
    case DELETE_NOTE:
      return state.filter((note) => {
        return note._id !== action.payload;
      });
    case GET_NOTES:
      return action.payload;
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