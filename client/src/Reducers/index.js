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
    SIGNEDUP,
    LOGGEDOUT
} from '../Actions';
let _id = -1;
const initialState = {
    notes: [],
    id: _id,
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
    error: null
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
                notes: [...state.notes, ...action.payload]
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
                notes: [...state.notes].map(note => {
                    if (note._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return note;
                    }
                })
            };
        case DELETINGNOTE:
            return { ...state, deletingNote: true };
        case NOTEDELETED:
            return {
                ...state,
                deletingNote: false,
                noteDeleted: true,
                notes: [...state.notes].filter(
                    note => note._id !== action.payload
                )
            };
        case LOGGINGIN:
            return { ...state, loggingIn: true };
        case LOGGEDIN:
            return { ...state, loggingIn: false, loggedIn: true };
        case SIGNNINGUP:
            return { ...state, signningUp: true };
        case SIGNEDUP:
            return { ...state, signningUp: false, signedUp: true };
        case LOGGEDOUT:
            return { ...state, loggedIn: false, loggedOut: true };
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
