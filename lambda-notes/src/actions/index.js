import axios from "axios";
const config = require("../_config");
export const PENDING_NOTES = "PENDING_NOTES";
export const SUCCESS_NOTES = "SUCCESS_NOTES";
export const ERROR_NOTES = "ERROR_NOTES";
/*
   C - addNote
   R - getNotes
   U - updateNote
   D - deleteNote
*/
export const fetchNotes = () => {
    const notes = axios.get(`${config.devBackend}/notes`);
    return dispatch => {
        dispatch({ type: PENDING_NOTES });
        notes
            .then(response => {
                console.log(response);
                dispatch({ type: SUCCESS_NOTES, payload: response.data });
            })
            .catch(response => {
                dispatch({ type: ERROR_NOTES, payload: response.data });
            });
    };
};