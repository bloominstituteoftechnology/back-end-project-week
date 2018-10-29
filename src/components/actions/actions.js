import axios from "axios";

export const ADD_NOTE = "ADD_NOTE";
export const GET_NOTES = "GET_NOTES";
export const DELETE_NOTE = "DELETE_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const FETCHING_NOTES = "FETCHING_NOTES";
export const FETCHED_NOTES = "FETCHED_NOTES";
export const NOTES_FETCHING_ERROR = "NOTES_FETCHING_ERROR";
export const ADDING_NOTE = "ADDING_NOTE";
export const ADDED_NOTE = "ADDED_NOTE";
export const ADDING_NOTE_ERROR = "ADDING_NOTE_ERROR";
export const DELETING_NOTE = "DELETING_NOTE";
export const DELETED_NOTE = "DELETED_NOTE";
export const DELETED_NOTE_ERROR = "DELETED_NOTE_ERROR";

export const loadNotes = () => dispatch => {
	dispatch({ type: FETCHING_NOTES });
	const promise = axios.get("http://localhost:3300/notes");
	promise
		.then(response => {
			dispatch({ type: FETCHED_NOTES, payload: response.data });
		})
		.catch(err => {
			dispatch({ type: NOTES_FETCHING_ERROR, payload: err });
		});
};

export const addNote = note => dispatch => {
	dispatch({ type: ADDING_NOTE });
	console.log(note);
	axios
		.post("http://localhost:3300/notes", note)
		.then(response => {
			dispatch({ type: ADDED_NOTE, payload: response.data });
		})
		.catch(err => {
			dispatch({ type: ADDING_NOTE_ERROR, payload: err });
		});
};

export const deleteNote = id => dispatch => {
	dispatch({ type: DELETING_NOTE });
	axios
		.delete(`http://localhost:3300/notes/${id}`)
		.then(response => {
			dispatch({ type: DELETED_NOTE, payload: response.data });
		})
		.catch(err => {
			dispatch({ type: DELETED_NOTE_ERROR, payload: err });
		});
};
export const updateNote = note => {
	return { type: UPDATE_NOTE, payload: note };
};
