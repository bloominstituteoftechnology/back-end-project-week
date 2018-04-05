import axios from 'axios';
axios.defaults.withCredentials = true;

export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const USER_CREATE = 'USER_CREATE';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_ID = 'SET_ID';
export const GET_NOTES = 'GET_NOTES';
export const ADD_NOTE = 'ADD_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

const APIroot = 'http://localhost:5000';

export const authError = error => {
  if (error)
    return {
      type: AUTHENTICATION_ERROR,
      payload: error,
    };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};

//
//
// ─── USER ACTIONS ───────────────────────────────────────────────────────────────
//
export const userCreate = (username, password, confirmPassword, history) => {
  return dispatch => {
    if (password !== confirmPassword) {
      dispatch(authError('Your passwords must match each other.'));
      return;
    }
    axios
      .post(`${APIroot}/api/users`, { username, password })
      .then(res => {
        dispatch({ type: USER_CREATE, payload: res.data });
        history.push('/login');
      })
      .catch(err => {
        if (err.response.data.err.errors)
          dispatch(authError('Your username must be a valid email address.'));
        else if (err.response.data.err.errmsg)
          dispatch(authError('This username already exists.'));
      });
  };
};

export const userLogin = (username, password, history) => {
  return dispatch => {
    axios
      .post(`${APIroot}/api/login`, { username, password })
      .then(res => {
        sessionStorage.setItem('id', res.data);
        dispatch({ type: LOGIN, payload: res.data });
        history.push('/');
      })
      .catch(err => {
        if (err.response.data.error)
          dispatch(authError('Username/Password invalid.'));
      });
  };
};

export const userLogout = history => {
  return dispatch => {
    axios
      .post(`${APIroot}/api/logout`)
      .then(res => {
        sessionStorage.removeItem('id');
        dispatch({ type: LOGOUT });
        history.push('/');
      })
      .catch(err => {
        if (err) dispatch(authError(err));
      });
  };
};

export const setId = id => {
  return {
    type: SET_ID,
    payload: id,
  };
};

//
//
// ─── NOTE ACTIONS ───────────────────────────────────────────────────────────────
//
export const getNotes = id => {
  const notes = axios.get(`${APIroot}/api/notes/${id}`);
  return dispatch => {
    notes
      .then(res => {
        dispatch({ type: GET_NOTES, payload: res.data.notes });
      })
      .catch(error => {
        console.log(
          'In actions: There was an error getting the notes: ',
          error
        );
      });
  };
};

export const addNote = newNote => {
  const notes = axios.post(`${APIroot}/api/notes`, newNote);
  return dispatch => {
    notes
      .then(responseNote => {
        dispatch(getNotes(newNote.userId));
      })
      .catch(error => {
        console.log('In actions: There was an error adding the note: ', error);
      });
  };
};

export const editNote = (editedNote, id) => {
  const notePackage = { editedNote, id };
  const notes = axios.put(`${APIroot}/api/notes`, notePackage);
  return dispatch => {
    notes
      .then(res => {
        dispatch({ type: EDIT_NOTE, payload: res.data });
      })
      .catch(error => {
        console.log('In actions: There was an error editing the note: ', error);
      });
  };
};

export const deleteNote = id => {
  const notes = axios.delete(`${APIroot}/api/notes/${id}`);
  return dispatch => {
    notes
      .then(payload => {
        dispatch({ type: DELETE_NOTE, payload: payload.data });
      })
      .catch(error => {
        console.log(
          'In actions: There was an error deleting the note: ',
          error
        );
      });
  };
};
