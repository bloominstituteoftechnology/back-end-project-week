import axios from 'axios';

export const FETCHING_NOTES = 'FETCHING_NOTES';
export const NOTES_FETCHED = 'NOTES_FETCHED';
export const FETCHING_SINGLE_NOTE = 'FETCHING_SINGLE_NOTE';
export const SINGLE_NOTE_FETCHED = 'SINGLE_NOTE_FETCHED';
export const SAVING_NOTES = 'SAVING_NOTES';
export const NOTES_SAVED = 'NOTES_SAVED';
export const DELETING_NOTE = 'DELETING_NOTE';
export const NOTE_DELETED = 'NOTE_DELETED';
export const UPDATING_NOTE = 'UPDATING_NOTE';
export const NOTE_UPDATED = 'NOTE_UPDATED';
export const REDIRECT_FORPUT = 'REDIRECT_FORPUT';
export const ERROR = 'ERROR';

export const getNotes = (userId) => {
    const receiveNotes = axios.get(`http://localhost:1433/api/users/${userId}/notes`);
    return function (dispatch) {
        dispatch({ type: FETCHING_NOTES });
        receiveNotes
            .then(response => dispatch({ type: NOTES_FETCHED, payload: response.data }))
            .catch(error => dispatch({ type: ERROR, payload: error }))
    }
}

export const getSingleNote = (userId, noteId) => {
    const receiveSingleNote = axios.get(`http://localhost:1433/api/users/${userId}/notes/${noteId}`);
    return function (dispatch) {
        dispatch({ type: FETCHING_SINGLE_NOTE })
        receiveSingleNote
            .then(response => dispatch({ type: SINGLE_NOTE_FETCHED, payload: response.data }))
            .catch(error => dispatch({ type: ERROR, payload: error }))
    }
}

export const addNote = (userId, obj) => {
    const createNote = axios.post(`http://localhost:1433/api/users/${userId}/notes`, obj);
    return function (dispatch) {
        dispatch({ type: SAVING_NOTES });
        createNote
            .then(response => dispatch({ type: NOTES_SAVED, payload: response.data }))
            .catch(error => dispatch({ type: ERROR, payload: error }))
    }
}

export const deleteNote = (userId, noteId) => {
    const removeNote = axios.delete(`http://localhost:1433/api/users/${userId}/notes/${noteId}`);
    return function (dispatch) {
        dispatch({ type: DELETING_NOTE });
        removeNote
            .then(response => dispatch({ type: NOTE_DELETED, payload: response.data }))
            .catch(error => dispatch({ type: ERROR, payload: error }))
    }
}

export const updateNote = (userId, noteId, obj) => {
    const modifyNote = axios.put(`http://localhost:1433/api/users/${userId}/notes/${noteId}`, obj)
    return function (dispatch) {
        dispatch({ type: UPDATING_NOTE });
        modifyNote
            .then(response => dispatch({ type: NOTE_UPDATED, payload: response.data }))
            .catch(error => dispatch({ type: ERROR, payload: error }))
    }
}

export const redirectForPut = () => {
    return function (dispatch) {
        dispatch({ type: REDIRECT_FORPUT })
    }
}