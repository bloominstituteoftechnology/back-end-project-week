import {
    FETCHING_NOTES,
    UPDATING_NOTES,
    DELETING_NOTE,
    ADDING_NOTE,
    SUCCESS,
    ERROR,
} from '../actions';

const initialState = {
    notes: [],
    fetchingNotes: false,
    updatingNotes: false,
    deletingNotes: false,
    addingNote: false,
    notesReady: false,
    error: null,
    modalType: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_NOTES:
            return {...state, fetchingNotes: true }
        case ADDING_NOTE:
            return {...state, addingNote: true }
        case UPDATING_NOTES:
            return {...state, updatingNotes: true }
        case DELETING_NOTE:
            return {...state, deletingNotes: true }
        case SUCCESS:
            return {
                    ...state,
                    notes: [...action.payload],
                    fetchingNotes: false,
                    addingNote: false,
                    updatingNotes: false,
                    deletingNotes: false,
                    notesReady: true,
                    error: null
                }
        case ERROR:
            console.error(action.payload)
            return {
                    ...state,
                    fetchingNotes: false,
                    updatingNotes: false,
                    deletingNotes: false,
                    addingNote: false,
                    notesReady: false,
                    error: 'Error, NOTE running away...',
                }
        default:
            return state;
    }
} 