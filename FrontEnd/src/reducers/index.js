import { ADD_NOTE, EDIT_NOTE, DELETE_NOTE } from '../actions'

let id = 0;
const initialState = {
    notes: [{
        id: id,
        title: '',
        content: ''
    }],
}


const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_NOTE:
            ++id;
            return {
                ...state, 
                notes: [...state.notes, 
                    {...action.payload, id: id}
                ]};
        case EDIT_NOTE:
            return {
                ...state, 
                notes: state.notes.map(note => {
                if (note.id === action.payload.id) {
                    return action.payload
                } return note;
            })}
        case DELETE_NOTE:
            return {
                ...state, 
                notes: state.notes.filter(note => 
                    note.id !== action.payload)};

        default:
            return state;
    }
}

export default rootReducer;

/* export default (state = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_NOTE:
        ++id;
        return [
            ...state,
            Object.assign({}, action.note)
        ];

        case actionTypes.DELETE_NOTE:
        return state.filter((data, i) => i !== action.id);

        case actionTypes.EDIT_NOTE:
        return [
            ...state,
            note: state.note.map(note => {})
        ]

        default:
            return state;
    }
} */