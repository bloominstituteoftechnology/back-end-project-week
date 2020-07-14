import { PENDING_NOTES, SUCCESS_NOTES, ERROR_NOTES } from "../actions";

const initialState = [{
    pending: false,
    error: null,
    notes: []
}];

export const notesReducer = (state = initialState, action) => {
    const stateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case PENDING_NOTES:
            stateCopy[0].pending = true;
            return stateCopy;
        case SUCCESS_NOTES:
            stateCopy[0].pending = false;
            stateCopy[0].notes = action.payload;
            console.log("action payload: ",action.payload)
            return stateCopy;
        case ERROR_NOTES:
            return Object.assign({}, state, {
                pending: false,
                notes: [action.payload]
            });
        default:
            return state;
    }
};