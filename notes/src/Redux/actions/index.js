import axios from 'axios';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const USER_CREATE = 'USER_CREATE';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GET_NOTES = 'GET_NOTES';
export const ADD_NOTE = 'ADD_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

const APIroot = 'http://localhost:3000';

export const authError = error => {
  if (error)
    return {
      type: AUTHENTICATION_ERROR,
      payload: error,
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
        dispatch({ type: USER_CREATE });
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

export const login = (username, password, history) => {
  return dispatch => {
    axios
      .post(`${APIroot}/api/login`, { username, password })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        dispatch({ type: LOGIN });
        history.push('/jokes');
      })
      .catch(err => {
        if (err.response.data.error)
          dispatch(authError('Username/Password invalid.'));
      });
  };
};

export const logout = () => {
  // localStorage.removeItem('token');
  // return { type: LOGOUT };
};

//
//
// ─── NOTE ACTIONS ───────────────────────────────────────────────────────────────
//
export const getNotes = (id) => {
  const notes = axios.get(`${APIroot}/api/notes`, id);
  return dispatch => {
    notes
      .then(payload => {
        dispatch({ type: GET_NOTES, payload: payload.data });
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
      .then(newNote => {
        dispatch(getNotes());
      })
      .catch(error => {
        console.log('In actions: There was an error adding the note: ', error);
      });
  };
};

export const editNote = editedNote => {
  const notes = axios.delete(`${APIroot}${editedNote.id}`);
  return dispatch => {
    notes
      .then(() => {
        return axios.post(APIroot, editedNote);
      })
      .then(payload => {
        dispatch({ type: EDIT_NOTE, payload: payload.data });
      })
      .catch(error => {
        console.log('In actions: There was an error editing the note: ', error);
      });
  };
};

export const deleteNote = oldNote => {
  const notes = axios.delete(`${APIroot}${oldNote.id}`);
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
