export const ADD_NOTE = 'ADD_NOTE';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const UPDATE_NOTE = 'UPDATE_NOTE';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const DELETE_NOTE = 'DELETE_NOTE';
export const SELECT_NOTE = 'SELECT_NOTE';
export const SORT_NOTES = 'SORT_NOTES';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const NOTES_FETCHED = 'NOTES_FETCHED';
export const ERROR_FETCHING = 'ERROR_FETCHING';

const URI = 'http://localhost:3030';

export const fetchNotes = () => {
  return dispatch => {
    axios
      .get(`${URI}/notes`)
      .then(({ data }) => {
        dispatch({ type: NOTES_FETCHED, payload: data.notes });
      })
      .catch(err => {
        dispatch({ type: ERROR_FETCHING, payload: err });
      });
  };
};

export const addNote = note => {
  return {
    type: ADD_NOTE,
    payload: note,
  };
};

export const updateNote = note => {
  return {
    type: UPDATE_NOTE,
    payload: note,
  };
};

export const toggleModal = () => {
  return {
    type: TOGGLE_MODAL,
  };
};

export const deleteNote = id => {
  return {
    type: DELETE_NOTE,
    payload: id,
  };
};

export const selectNote = id => {
  return {
    type: SELECT_NOTE,
    payload: id,
  };
};

export const sortNotes = sort => {
  return {
    type: SORT_NOTES,
    payload: sort,
  };
};

export const login = (userData) => {
  return {
    type: LOGIN_USER,
    payload: userData,
  }
}

export const logout = () => {
  return {
    type: LOGOUT_USER,
  }
}