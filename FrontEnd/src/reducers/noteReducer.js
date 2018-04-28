import {
    FETCH_NOTE,
    NOTES_RETRIEVED,
    ADD_NOTE,
    NOTE_ADDED,
    EDIT_NOTE,
    NOTE_EDITED,
    DELETE_NOTE,
    NOTE_DELETED,
    ERROR,
} from '../actions/types';

let id = -1;
const initialState = {
    notes: [{_id: 1, title: 'Boo', body: 'Double Booness' }],
    id: id,
    get_notes: false,
    notes_retrieved: false,
    add_note: false,
    note_added: false,
    edit_note: false,
    note_edited: false,
    delete_note: false,
    note_deleted: false,
    error: null
};

const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NOTE:
            return { ...state, get_notes: true };
        case NOTES_RETRIEVED:
            return {
                ...state,
                get_notes: false,
                notes_retrieved: true,
                notes: [...state.notes, ...action.payload]
            };
        case ADD_NOTE:
            return { ...state, add_note: true };
        case NOTE_ADDED:
            return {
                ...state,
                notes: [...state.notes, action.payload],
                add_note: false,
                note_added: true
            };
        case EDIT_NOTE:
            return { ...state, edit_note: true };
        case NOTE_EDITED:
            return {
                ...state,
                edit_note: false,
                note_edited: true,
                notes: [...state.notes]
                    .map(note => {
                        if (note._id === action.payload._id) {
                            return action.payload;
                        } else {
                            return note;
                        }
                    })
            };
        case DELETE_NOTE:
            return { ...state, delete_note: true };
        case NOTE_DELETED:
            return {
                ...state,
                delete_note: false,
                note_deleted: true,
                notes: [...state.notes]
                    .filter(note => note._id !== action.payload)
            };
        default:
            return state
    };
};

export default noteReducer;