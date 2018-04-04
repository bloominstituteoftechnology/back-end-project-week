import axios from 'axios';
axios.defaults.withCredentials = true;
const ROOT_URL = 'http://localhost:5000/api';

export const GET_ALL_NOTES = 'GET_ALL_NOTES';
export const GET_NOTE = 'GET_NOTE';
export const CREATE_NOTE = 'CREATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const ERROR = 'ERROR';
export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';

export const authError = error => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error
  };
};

export const checkAuth = () => {
  return dispatch => ({
    type: CHECK_IF_AUTHENTICATED,
  });
};

export const error = error => {
  return {
    type: ERROR,
    payload: error
  };
};

export const authUser = () => {
  return dispatch => {
    dispatch({ type: USER_AUTHENTICATED });
  };
};

export const getAllNotes = () => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/notes`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then(response => {
        dispatch({
          type: GET_ALL_NOTES,
          payload: response.data
        });
      })
      .catch(() => {
        dispatch(error('Failed to retrieve notes'));
      });
  };
};

export const getNote = (id) => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/notes/${id}`)
      .then((response) => {
        console.log('getNote response', response);
        dispatch({
          type: GET_NOTE,
          payload: response.data
        });
      })
      .catch(() => {
        dispatch(error('Failed to retrieve note'));
      })
  }
}

export const createNote = (title, content) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/notes`, { title, content })
      .then(() => {
        dispatch({
          type: CREATE_NOTE
        })
      })
      .catch(() => {
        dispatch(error('Failed to create new note'))
      });
  };
};

export const deleteNote = (id) => {
  return dispatch => {
    axios
      .delete(`${ROOT_URL}/notes/${id}`)
      .then(() => {
        dispatch({
          type: DELETE_NOTE,
        })
      })
      .catch(() => {
        dispatch(error('Failed to delete note'))
      });
  };
};

export const editNote = (updatedNote, id) => {
  return dispatch => {
    axios
      .put(`${ROOT_URL}/notes/${id}`, updatedNote)
      .then(() => {
        dispatch({
          type: EDIT_NOTE,
        })
      })
      .catch(() => {
        dispatch(error('Failed to update note'))
      })
  };
};

export const register = (username, password, history) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/users`, { username, password })
      .then(() => {
        dispatch({
          type: USER_REGISTERED,
        });
        history.push('/login');
      })
      .catch(() => {
        dispatch(authError('Failed to register'));
      });
  };
};

export const login = (username, password, history) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/login`, { username, password })
      .then(() => {
        dispatch({
          type: USER_AUTHENTICATED,
        })
        history.push('/notes');
      })
      .catch(() => {
        dispatch(authError('Incorrect credentials'));
      });
  };
};
