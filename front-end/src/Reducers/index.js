import {
  GETTINGNOTES,
  NOTESRECEIVED,
  ADDINGNOTE,
  NOTEADDED,
  UPDATINGNOTE,
  NOTEUPDATED,
  DELETINGNOTE,
  NOTEDELETED,
  ERROR,
  LOGGEDIN,
  LOGGINGIN,
  SIGNNINGUP,
  SIGNEDUP
} from "../Actions";
let id = 0;
const initialState = {
  notes: [
    {
      ID: id,
      Title: "First Note",
      Text: "Here is your first note. Feel free to edit or delete this note."
    }
  ],
  id: id,
  gettingNotes: false,
  notesReceived: false,
  addingNote: false,
  noteAdded: false,
  updatingNote: false,
  noteUpdated: false,
  deletingNote: false,
  noteDeleted: false,
  loggingIn: false,
  loggedIn: false,
  signningUp: false,
  signedUp: false,
  loggedOut: false,
  error: false
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTINGNOTES:
      return { ...state, gettingNotes: true };
    case NOTESRECEIVED:
      return {
        ...state,
        gettingNotes: false,
        notesReceived: true,
        notes: [...state.notes, action.payload]
      };
    case ADDINGNOTE:
      return { ...state, addingNote: true };
    case NOTEADDED:
      return {
        ...state,
        notes: [...state.notes, action.payload],
        addingNote: false,
        noteAdded: true
      };
    case UPDATINGNOTE:
      return { ...state, updatingNote: true };
    case NOTEUPDATED:
      return {
        ...state,
        updatingNote: false,
        noteUpdated: true,
        notes: action.payload
      };
    case DELETINGNOTE:
      return { ...state, deletingNote: true };
    case NOTEDELETED:
      return {
        ...state,
        deletingNote: false,
        noteDeleted: true,
        notes: action.payload
      };
    case LOGGINGIN:
      return { ...state, loggingIn: true };
    case LOGGEDIN:
      return { ...state, loggingIn: false, loggedIn: true };
    case SIGNNINGUP:
      return { ...state, signningUp: true };
    case SIGNEDUP:
      return { ...state, signningUp: false, signedUp: true };
    case ERROR:
      return {
        ...state,
        gettingNotes: false,
        addingNote: false,
        updatingNote: false,
        deletingNote: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default noteReducer;

// const noteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case NOTEADDED:
//       ++id;
//       return {
//         ...state,
//         notes: [...state.notes, { ...action.payload, ID: id }],
//         id: id,
//         noteAdded: true
//       };
//     case NOTEUPDATED:
//       return {
//         ...state,
//         notes: state.notes.map(note => {
//           if (note.ID === action.payload.ID) {
//             return action.payload;
//           }
//           return note;
//         }),
//         noteUpdated: true
//       };
//     case NOTEDELETED:
//       return {
//         ...state,
//         notes: state.notes.filter(note => note.ID !== action.payload),
//         noteDeleted: true
//       };
//     case LOGGEDIN:
//       return { ...state, loggedIn: true };
//     case LOGGEDOUT:
//       return { ...state, loggedIn: false, loggedOut: true };
//     default:
//       return state;
//   }
// };
