import axios from 'axios';

const URL = 'http://localhost:5050/api/notes';

export const ERROR_FETCHING_NOTE = 'ERROR_FETCHING_NOTE';
export const GET_NOTE = 'GET_NOTE';
export const FETCHING_NOTE = 'FETCHING_NOTE';
export const CREATING_NOTE = 'CREATING_NOTE';
export const PENDING_NOTE = 'PENDING_NOTE';
export const SUCCESS_NOTE = 'SUCCESS_NOTE';
export const ERROR = 'ERROR';
export const CREATE_NOTE = 'CREATE_NOTE';
export const ERROR_NOTE = 'ERROR_NOTE';
export const DELETING_NOTE = 'DELETING_NOTE';
export const SUCCESS_DELETING = 'SUCCESS_DELETING';

export const getNote = () => {
    const promise = axios.get('http://localhost:5050/api/notes');
    return dispatch => {
      dispatch({ type: FETCHING_NOTE });
      promise
        .then(response => {
          dispatch({ type: SUCCESS_NOTE, payload: response.data });
        })
        .catch(err => {
          dispatch({ type: ERROR, payload: 'Error Getting Your Note' });
        });
    };
  };

  export const createNote = note => {
    const newNote = axios.post('http://localhost:5050/api/notes', note);
    return dispatch => {
      dispatch({ type: CREATING_NOTE });
      newNote
        .then(response => {
          dispatch({ type: SUCCESS_NOTE, payload: response.data });
        })
        .catch(err => {
          dispatch({ type: ERROR, payload: 'error creating note' });
        });
    };
  };

  export const deleteNote = noteId => {
    const promise = axios.delete(`${URL}/${noteId}`);
    return dispatch => {
      dispatch({ type: DELETING_NOTE });
      promise
        .then(response => {
          dispatch(getNote());
        })
        .catch(err => {
          dispatch({ type: ERROR, payload: 'error deleting note' });
        });
    };
  };

