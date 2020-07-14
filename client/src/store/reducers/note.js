import * as actionType from '../actions/actionTypes';
const istate = {
    notes: [],
    note: {},
    error: false
}

function noteReducer(state = istate, action) {
    switch (action.type) {
        case actionType.ADD__NOTE:
            return {
                ...state,
                notes: [...state.notes, action.notes]
            }
        case actionType.ADD__ERROR:
            return {
                ...state,
                error: action.error
            }
        case actionType.READ__NOTE:
            return {
                ...state,
                note: action.note
            }
        case actionType.GET__NOTES:
            return {
                ...state,
                notes: action.notes
            }
        case actionType.DELETE__NOTE:

            return {
                ...state,
                notes: state.notes.filter(note => note.id !== Number(action.id))
            }
        default:
            return state;
    }
}
export default noteReducer;