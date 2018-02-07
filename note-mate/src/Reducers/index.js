import { NOTEADDED, NOTEUPDATED, NOTEDELETED, LOGGEDIN, LOGGEDOUT } from '../Actions'
// import { GETTINGNOTES, NOTESRECEIVED, ADDINGNOTE, UPDATINGNOTE, NOTEUPDATED, DELETINGNOTE, NOTEDELETED, ERROR } from '../Actions';
let id = 0;
const initialState = {
    notes: [{
        ID: id,
        Title: 'First Note',
        Text: 'Here is your first note. Feel free to edit or delete this note.'
    }],
    gettingNotes: false,
    notesReceived: false,
    addingNote: false,
    noteAdded: false,
    updatingNote: false,
    noteUpdated: false,
    deletingNote: false,
    noteDeleted: false,
    loggedIn: false,
    loggedOut: false,
    error: false
}


const noteReducer = (state = initialState, action) => {
    switch(action.type) {
        case NOTEADDED:
            ++id;
            return {...state, notes: [...state.notes, {...action.payload, ID: id}]};
        case NOTEUPDATED:
            return {...state, notes: state.notes.map(note => {
                if (note.ID === action.payload.ID) {
                    return action.payload
                } return note;
            })};
        case NOTEDELETED:
            return {...state, notes: state.notes.filter(note => note.ID !== action.payload)};
        case LOGGEDIN:
            return {...state, loggedIn: true};
        case LOGGEDOUT:
            return {...state, loggedIn: false, loggedOut: true};
        default:
            return state;
    }
}

export default noteReducer;

// Reducer to use when server is hooked up

// const noteReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case GETTINGNOTES: 
//             return {...state, gettingNotes: true};
//         case NOTESRECEIVED:
//             return {...state, gettingNotes: false, notesReceived: true, notes: [...state.notes, action.payload]};
//         case ADDINGNOTE:
//             return {...state, addingNote: true};
//         case NOTEADDED:
//             return {...state, notes: [...state.notes, action.payload], addingNote: false, noteAdded: true};
//         case UPDATINGNOTE:
//             return {...state, updatingNote: true}
//         case NOTEUPDATED:
//             return {...state, updatingNote: false, noteUpdated: true, notes: action.payload};
//         case DELETINGNOTE:
//             return {...state, deletingNote: true}
//         case NOTEDELETED:
//             return {...state, deletingNote: false, noteDeleted: true, notes: action.payload}
//         case ERROR: 
//             return {...state, gettingNotes: false, addingNote: false, updatingNote: false, deletingNote: false ,error: action.payload};
//         default:
//             return state;
//     }
// }