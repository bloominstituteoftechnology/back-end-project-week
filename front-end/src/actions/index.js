import axios from 'axios';

export const FETCH_NOTES = 'FETCH_NOTES';
export const NOTES_FETCHED = 'NOTES_FETCHED';
export const NOTE_FETCH_ERROR = 'NOTE_FETCH_ERROR';

export const ADD_NOTE = 'ADD_NOTE';
export const NOTE_ADDED = 'NOTE_ADDED';
export const NOTE_ADD_ERROR = 'NOTE_ADD_ERROR';

export const UPDATE_NOTE = 'UPDATE_NOTE';
export const NOTE_UPDATED = 'NOTE_UPDATED';
export const NOTE_UPDATE_ERROR = 'NOTE_UPDATE_ERROR';

export const DELETE_NOTE = 'DELETE_NOTE';
export const NOTE_DELETED = 'NOTE_DELETED';
export const NOTE_DELETE_ERROR = 'NOTE_DELETE_ERROR';

export const getNotes = () => {
  return dispatch => {
    dispatch({ type: FETCH_NOTES });
    axios
      .get('http://localhost:5000/api/notes/get')
      .then(response => {
        dispatch({ type: NOTES_FETCHED, payload: response.data });
      })
      .catch(error =>
        dispatch({ type: NOTE_FETCH_ERROR, payload: error })
      );
  };
};

export const postNote = note => {
  return dispatch => {
    dispatch({ type: ADD_NOTE });
    axios
      .post('http://localhost:5000/api/notes/create', note)
      .then(response =>
        dispatch({ type: NOTE_ADDED, payload: response.data })
      )
      .catch(error => dispatch({ type: NOTE_ADD_ERROR, payload: error }));
  };
};

export const updateNote = note => {
  return dispatch => {
    dispatch({ type: UPDATE_NOTE });
    axios
      .put('http://localhost:5000/api/notes/update', note)
      .then(response => {
        dispatch({ type: NOTE_UPDATED, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: NOTE_UPDATE_ERROR, payload: error });
      });
  };
};

export const deleteNote = index => {
  return dispatch => {
    dispatch({ type: DELETE_NOTE });
    axios
      .delete('http://localhost:5000/api/notes/delete', index)
      .then(response => {
        dispatch({ type: NOTE_DELETED, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: NOTE_DELETE_ERROR, payload: error });
      });
  };
};
