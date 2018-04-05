import axios from 'axios';

axios.defaults.withCredentials = true;

const ROOT_URL = 'http://localhost:5000/api';

export const GET_NOTES = 'GET_NOTES';
export const CREATE_NOTE = 'CREATE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const TOGGLE_DELETE = 'TOGGLE_DELETE';

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';

export const authError = (error) => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error
  };
};

export const getNotes = () => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/notes`, { headers: { Authorization: window.localStorage.getItem('token') } })
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

export const createNote = (note) => {
  // return {
  //   type: CREATE_NOTE,
  //   payload: note
  // };
  return dispatch => {
    axios
      .post(`${ROOT_URL}/new`, note, { headers: { Authorization: window.localStorage.getItem('token') } })
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
      .put(`${ROOT_URL}/notes`, note, { headers: { Authorization: window.localStorage.getItem('token') } })
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
  // return {
  //   type: DELETE_NOTE,
  //   payload: id
  // };
  return dispatch => {
    axios
      .delete(`${ROOT_URL}/notes`, id, { headers: { Authorization: window.localStorage.getItem('token') } })
      .then(response => {
        dispatch({
          type: DELETE_NOTE,
          payload: id
        });
      })
      .catch(() => {
        dispatch(authError('Failed to delete note'));
      });
  };
};

export const toggleDelete = (id) => {
  // return {
  //   type: TOGGLE_DELETE,
  //   payload: id
  // };
  return dispatch => {
    axios
      .delete(`${ROOT_URL}/notes`, id, { headers: { Authorization: window.localStorage.getItem('token') } })
      .then(response => {
        dispatch({
          type: TOGGLE_DELETE,
          payload: id
        });
      })
      .catch(() => {
        dispatch(authError('Failed to delete note'));
      });
  };
};

export const createUser = (username, password) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/signup`, { username, password })
      .then((response) => {
        dispatch({
          type: USER_REGISTERED,
          payload: response
          // type: USER_AUTHENTICATED,
          // payload: response
        });
        window.localStorage.setItem('token', response.data.token);
      })
      .catch(() => {
        dispatch(authError('Failed to register user'));
      });
  };
};

export const login = (username, password) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/login`, { username, password })
      .then((response) => {
        dispatch({
          type: USER_AUTHENTICATED,
          payload: response
        });
        window.localStorage.setItem('token', response.data.token);
        // console.log(history);
        // history.push('/notes');
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
    window.localStorage.removeItem('token');
    window.location.reload();
  };
};

export const checkIfLoggedIn = () => {
  return dispatch => {
    dispatch({ 
      type: CHECK_IF_AUTHENTICATED 
    });
  }
}