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
} from "../Actions";

let id = -1;
const initialState = {
    notes: [],
    id: id,
    get_Notes: false,
    notes_Retrieved: false,
    add_Note: false,
    note_Added: false,
    edit_Note: false,
    note_Edited: false,
    delete_Note: false,
    note_Deleted: false,
    error: null
};

const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case get_Notes:
            return { ...state, getNotes: true };
        case notes_Retrieved:
            return {
                ...state,
                get_Notes: false,
                notes_Retrieved: true,
                notes: [...state.notes, ...action.payload]
            };
        case add_Note:
            return { ...state, add_Note: true };
        case note_Added:
            return {
                ...state,
                notes: [...state.notes, action.payload],
                addNote: false,
                note_Added: true
            };
        case edit_Note:
            return { ...state, edit_Note: true };
        case note_Edited:
            return {
                ...state,
                edit_Note: false,
                note_Edited: true,
                notes: [...state.notes]
                    .map(note => {
                        if (note._id === action.payload._id) {
                            return action.payload;
                        } else {
                            return note;
                        }
                    })
            };
        case delete_Note:
            return { ...state, delete_Note: true };
        case note_Deleted:
            return {
                ...state,
                delete_Note: false,
                note_Deleted: true,
                notes: [...state.notes]
                    .filter(note => note._id !== action.payload)
            }
    }
};

export default noteReducer;