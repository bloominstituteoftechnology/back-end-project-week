import * as actionTypes from '../actions';

const initialState = {
	notes: [],
	fetchingNotes: false,
	updatingNote: false,
	addingNote: false,
	deletingNote: false,
	error: null
};

export const notesReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCHING_NOTES:
			return {...state, fetchingNotes: true};
		case actionTypes.FETCH_NOTES:
			return {...state, notes: action.payload, fetchingNotes: false};
		case actionTypes.UPDATING_NOTE:
			return {...state, updatingNote: true};
		case actionTypes.DELETING_NOTE:
			return {...state, deletingNote: true};
		case actionTypes.DELETE_NOTE:
			return {...state, notes: action.payload, deletingNote: false};
		case actionTypes.ADDING_NOTE:
			return {...state, addingNote: true};
		case actionTypes.ADD_NOTE:
			return {...state, notes: action.payload, addingNote: false};
		case actionTypes.ERROR:
			return {
				...state,
				fetchingNotes: false,
				addingNote: false,
				deletingNote: false,
				updatingNote: false,
				error: action.payload
			};
		default:
			return state;
	}
};