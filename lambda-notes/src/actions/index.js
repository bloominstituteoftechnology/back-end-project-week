import axios from 'axios';

export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';

const ROOT_URL = 'http://localhost:5000';

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const GET_USERS = 'GET_USERS';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';
export const GET_NOTES = 'GET_NOTES';

// axios.defaults.withCredentials = true;

//=====================================
//         Validation Actions
//=====================================

export const authError = error => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error
  };
};

export const register = (newUser, history) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/api/users`, newUser)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        dispatch({
          type: USER_REGISTERED
        });
        history.push('/login');
      })
      .catch(() => {
        dispatch(authError('Failed to register user!'));
      });
  };
};

export const login = (user, history) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/api/login`, user)
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        dispatch({
          type: USER_AUTHENTICATED
        });
        history.push('/home');
      })
      .catch(() => {
        dispatch(authError('There was an error!'));
      });
  };
};

export const getUsers = () => {
  const headers = { 
    authorization: localStorage.getItem('token')
  }
  return dispatch => {
    axios
      .get(`${ROOT_URL}/api/get`, {headers})
      .then(res => {
        dispatch({
          type: GET_USERS,
          payload: res.data
        });
      })
      .catch(() => {
        dispatch(authError('Failed to fetch users!'));
      });
  };
};

export const logout = (history) => {
  return dispatch => {
    localStorage.removeItem('token')
    dispatch({
      type: USER_UNAUTHENTICATED
    });
  };
};

//=====================================
//            UI Actions
//=====================================

export const addNote = (theNote, history) => {
  const headers = { 
    authorization: localStorage.getItem('token')
  }
  return dispatch => {
    axios
      .post(`${ROOT_URL}/api/new-note`, theNote, {headers})
      .then(res => {
        dispatch({
          type: ADD_NOTE,
          payload: res.data
        });
        history.push('/home');
      })
      .catch(() => {
        dispatch(authError('Failed to save note!'));
      });
  };
}

export const getNotes = () => {
  const headers = { 
    authorization: localStorage.getItem('token')
  }
  const notes = axios.get(`${ROOT_URL}/api/notes/`, {headers});
  return dispatch => {
    notes
      .then(res => {
        dispatch({ 
          type: GET_NOTES, 
          payload: res.data
        });
      })
      .catch(err => {
        dispatch(authError('No notes to display!', err));
      });
  };
};

export const editNote = (edited, id, history) => {
  const headers = { 
    authorization: localStorage.getItem('token')
  }
  const note = axios.put(`${ROOT_URL}/api/note/edit/${id}`, edited, {headers});
  return dispatch => {
    note
      .then(res => {
        dispatch({ 
          type: EDIT_NOTE, 
          payload: res.data
        });
        history.push('/home');
      })
      .catch(err => {
        dispatch(authError('Error updating note!', err));
      });
  };
};

export const deleteNote = (deleted, history) => {
  const headers = { 
    authorization: localStorage.getItem('token')
  }
  const note = axios.delete(`${ROOT_URL}/api/note/delete/${deleted}`, {headers});
  return dispatch => {
    note
      .then(res => {
        console.log(res.data)
        dispatch({ 
          type: EDIT_NOTE, 
          payload: res.data
        });
        history.push('/home');
      })
      .catch(err => {
        dispatch(authError('Error deleting note!', err));
      });
  };
};

