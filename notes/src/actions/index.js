import axios from 'axios';
axios.defaults.withCredentials = true;

export const UPDATE_NOTE = 'UPDATE_NOTE';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const DELETE_NOTE = 'DELETE_NOTE';
export const SELECT_NOTE = 'SELECT_NOTE';
export const SORT_NOTES = 'SORT_NOTES';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const ERROR_ADDING_NOTE = 'ERROR_ADDING_NOTE';
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
  return dispatch => {
    axios
      .post(`${URI}/notes`, note)
      .then(({ data }) => {
        dispatch(fetchNotes());
      })
      .catch(err => {
        dispatch({ type: ERROR_ADDING_NOTE, payload: err });
      });
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

export const registerUser = userData => {
  return dispatch => {
    axios
      .post(`${URI}/register`, userData)
      .then()
      .catch(err => {
        dispatch({ type: REGISTER_ERROR, payload: err });
      });
  };
};

export const login = (userData, history) => {
  return dispatch => {
    axios
      .post(`${URI}/login`, userData)
      .then(({ data }) => {
        sessionStorage.setItem('username', userData.username);
        dispatch({ type: USER_LOGGED_IN, payload: data });
        history.push('/');
      })
      .catch(err => {
        dispatch({ type: LOGIN_ERROR, payload: err });
      });
  };
};

export const logout = () => {
  return {
    type: LOGOUT_USER,
  }
}