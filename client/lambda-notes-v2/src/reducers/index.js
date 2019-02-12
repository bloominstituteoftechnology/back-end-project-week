// import { combineReducers } from 'redux';

// import fetchReducer  from './fetchReducer';

// export default combineReducers({
//     fetchReducer
// })

import {
    FETCH_CALLED, 
    FETCH_RETURNED, 
    SERVER_ERROR,
    ADD_CALLED,
    ADD_RETURNED,
    DELETE_CALLED,
    DELETE_RETURNED,
    EDIT_CALLED,
    EDIT_RETURNED,
} from '../actions/index';



const initialState = {
    notes: [],
    fetchingData: false,
    addingData: false,
    updatingData: false,
    deletingData: false,
    deleteCalled: false,
    deleteReturned: false,
    editCalled: false,
    editReturned: false,
    etGoHome: false,
    error: null
}

export const fetchReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CALLED:
            return Object.assign({}, state, {
                fetchingData: true
            })
        case FETCH_RETURNED:
            return { ...state, fetchingData: false, notes: action.payload }
        case ADD_CALLED:
            return { ...state, addingData: true }
        
/*
    BELOW 2 ARE THE SAME, DIFFERENT SYNTAX
    -->   Object.assign({}, state, newState)   <--
    -->   {...state, newState}   <--
*/
    /*
        case ADD_RETURNED:
            return Object.assign({}, state, {
                notes: [
                    ...state.notes,
                    {
                        ...action.payload.data
                    }
                ],
                addingData: false,
            })
    */
        case ADD_RETURNED:
                /* Copy State using Spread Operator */
            return {...state,
                /* New State */
                notes: [
                    /* Deconstruct Copied State */
                    ...state.notes,
                    /* Add New to End of Copied State */
                    {
                        ...action.payload.data
                    }
                ],
                addingData: false,
            }
/**/

        case DELETE_CALLED:
            return {...state, deleteCalled: true}
        case DELETE_RETURNED:
            let updatedNotes = state.notes.filter(note => {
                return note.id !== action.payload.deletedId;
            });
            console.log('notes updated');
            return {...state, notes: updatedNotes, deleteReturned: true}   
            
        
        case EDIT_CALLED:
            return{...state, editCalled: true}
        case EDIT_RETURNED:
            let updatedEditNotes = [...state.notes];

            action.payload.dbResponseCode === 1  && state.notes[action.payload.userSentIndex].id === parseInt(action.payload.id, 10) ?
            updatedEditNotes.splice(action.payload.userSentIndex, 1, action.payload.savedRow) :
            window.location.reload();

            return{...state, notes: updatedEditNotes, editReturned: true}


        case SERVER_ERROR:
            return { ...state, error: action.payload }


        default:
            return state;
    }
}
