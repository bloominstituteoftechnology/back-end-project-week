import axios from 'axios';

axios.defaults.withCredentials = true;

const ROOT_URL = 'http://localhost:5000/api';

export const CREATE_NOTE = 'CREATE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const TOGGLE_DELETE = 'TOGGLE_DELETE';

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const GET_NOTES = 'GET_NOTES';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';

export const authError = (error) => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error
  };
};

export const createNote = (note) => {
  // return {
  //   type: CREATE_NOTE,
  //   payload: note
  // };
  return dispatch => {
    axios
      .post(`${ROOT_URL}/notes`, { headers: { Authorization: window.localStorage.getItem('authorization') } })
      .then(response => {
        dispatch({
          type: CREATE_NOTE,
          payload: response.data
        });
      })
      .catch(() => {
        dispatch(authError('Failed to post new note'));
      });
  };
};

export const editNote = (note) => {
  // return {
  //   type: EDIT_NOTE,
  //   payload: note
  // };
  return dispatch => {
    axios
      .put(`${ROOT_URL}/notes`, note, { headers: { Authorization: window.localStorage.getItem('authorization') } })
      .then(response => {
        dispatch({
          type: EDIT_NOTE,
          payload: response.data
        });
      })
      .catch(() => {
        dispatch(authError('Failed to edit note'));
      });
  };
};

export const deleteNote = (id) => {
  return {
    type: DELETE_NOTE,
    payload: id
  };
};

export const toggleDelete = (id) => {
  return {
    type: TOGGLE_DELETE,
    payload: id
  };
};

export const createUser = (username, password, confirmPassword, history) => {
  return dispatch => {
    if (password !== confirmPassword) {
      dispatch(authError('Passwords do not match'));
      return;
    }
    axios
      .post(`${ROOT_URL}/users`, { username, password })
      .then((response) => {
        dispatch({
          type: USER_REGISTERED
        });
        window.localStorage.setItem('authorization', response.data.token);
        history.push('/login');
      })
      .catch(() => {
        dispatch(authError('Failed to register user'));
      });
  };
};

export const login = (username, password, history) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/login`, { username, password })
      .then((response) => {
        dispatch({
          type: USER_AUTHENTICATED
        });
        window.localStorage.setItem('authorization', response.data.token);
        history.push('/notes');
      })
      .catch(() => {
        dispatch(authError('Username and Password combination does not match the data'));
      });
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({
      type: USER_UNAUTHENTICATED
    });
    window.localStorage.removeItem('authorization');
  };
};

export const getNotes = () => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/notes`, { headers: { Authorization: window.localStorage.getItem('authorization') } })
      .then(response => {
        dispatch({
          type: GET_NOTES,
          payload: response.data
        });
      })
      .catch(() => {
        dispatch(authError('Failed to get notes'));
      });
  };
};