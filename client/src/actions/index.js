import axios from 'axios';
axios.defaults.withCredentials = true;

const ROOT_URL = `http://localhost:5000/api`;

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';
export const VIEW_NOTE = 'VIEW_NOTE';
export const ADD_NOTE = 'ADD_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

export const authError = error => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error,
  };
};

export const signUp = (email, password, confirmPassword, history) => {
  return dispatch => {
    console.log({ email: email, password: password });
    if (password !== confirmPassword) {
      dispatch(authError('Passwords do not match'));
      return;
    }
    axios
      .post(`${ROOT_URL}/users`, { email, password })
      .then(() => {
        dispatch({
          type: USER_REGISTERED,
        });
        history.push('/login');
      })
      .catch(() => {
        dispatch(authError('Failed to register user'));
      });
  };
};

export const login = (email, password, history) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/login`, { email, password })
      .then(res => {
        console.log('res.data: ', res.data);
        console.log('response: ', res);
        dispatch({
          type: USER_AUTHENTICATED,
        });
        history.push('/notes/get');
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.userId);
      })
      .catch(() => {
        dispatch(authError('Incorrect username/password combo'));
      });
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  return { type: USER_UNAUTHENTICATED };
};

export const viewNote = data => {
  const config = { headers: { Authorization: localStorage.getItem('token') } };
  return dispatch => {
    axios
      .get(`${ROOT_URL}/notes/get`, config)
      .then(response => {
        dispatch({
          type: VIEW_NOTE,
          payload: response.data,
        });
      })
      .catch(() => {
        dispatch(authError('Failed to fetch notes'));
      });
  };
};

export const addNote = (data, history) => {
  const config = { headers: { Authorization: localStorage.getItem('token') } };
  const { title, text } = data;
  return dispatch => {
    axios
      .post(`${ROOT_URL}/notes/create`, { title, text }, config)
      .then(({ newNote }) => {
        dispatch({ type: ADD_NOTE, payload: newNote });
        history.push('/notes/get');
      })
      .catch(err => {
        dispatch(authError('Failed to add new note'));
      });
  };
};

export const editNote = (data, history) => {
  const config = { headers: { Authorization: localStorage.getItem('token') } };
  const { title, text, id } = data;
  return dispatch => {
    axios
      .put(`${ROOT_URL}/notes/update`, { title, text, id }, config)
      .then(updatedNote => {
        dispatch({ type: EDIT_NOTE, payload: updatedNote });
      })
      .catch(err => {
        dispatch(authError('Failed to update note'));
      });
    history.push(`/note/${id}`);
  };
};

export const deleteNote = (data, history) => {
  const config = {
    headers: {
      Authorization: localStorage.getItem('token'),
      id: data.id,
    },
  };
  return dispatch => {
    axios
      .delete(`${ROOT_URL}/notes/destroy/:id`, config)
      .then(deletedNote => {
        dispatch({ type: DELETE_NOTE, payload: deletedNote });
      })
      .catch(err => {
        dispatch(authError('Failed to delete note'));
      });
    history.push('/notelist');
  };
};
