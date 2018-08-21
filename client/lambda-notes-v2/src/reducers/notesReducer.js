import { FETCH_CALLED, FETCH_RETURNED, SERVER_ERROR } from '../actions/notesActions';

const initialState = {
    notes: [],
    fetchingNotes: false,
    addingNotes: false,
    updatingNotes: false,
    deletingNotes: false,
    error: null  
}


export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CALLED:
            return Object.assign({}, state, { fetchingNotes: true });
        case FETCH_RETURNED:
            return { ...state, fetchingNotes: false, notes: action.payload };
        case SERVER_ERROR:
            return { ...state, error: action.payload };

        default:
            return state;
    }
};