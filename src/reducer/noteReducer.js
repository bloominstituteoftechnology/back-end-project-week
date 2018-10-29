import {
	ADD_NOTE,
	GET_NOTES,
	DELETE_NOTE,
	UPDATE_NOTE,
	FETCHING_NOTES,
	FETCHED_NOTES,
	NOTES_FETCHING_ERROR,
	ADDING_NOTE,
	ADDED_NOTE,
	ADDING_NOTE_ERROR,
	DELETING_NOTE,
	DELETED_NOTE,
	DELETED_NOTE_ERROR
} from "../components/actions/actions";
import axios from "axios";

let initialState = {
	notes: [],
	fetchingNotes: false,
	addingNotes: false,
	updatingNotes: false,
	deletingNote: false
};

export const noteReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHING_NOTES:
			return { ...state, fetchingNotes: true };
		case FETCHED_NOTES:
			return { ...state, fetchingNotes: false, notes: action.payload };
		case NOTES_FETCHING_ERROR:
			return { ...state, fetchingNotes: false, error: action.payload };
		case UPDATE_NOTE:
			const { title, body } = action.payload;
			const newNote = { title, body };
			axios
				.put(
					`http://localhost:3300/notes/${action.payload.noteID}`,
					action.payload
				)
				.then(updated => {
					console.log(updated);
				});
			return { ...state, notes: [...state.notes, newNote] };

		case ADDING_NOTE:
			return { ...state, addingNotes: true };
		case ADDED_NOTE:
			return {
				...state,
				addingNotes: false,
				notes: action.payload
			};

		case DELETING_NOTE:
			return { ...state, deletingNote: true };
		case DELETED_NOTE:
			return { ...state, deletingNote: false, notes: action.payload };
		case DELETED_NOTE_ERROR:
			return { ...state, deletingNote: false, error: action.payload };
		default:
			return state;
	}
};
