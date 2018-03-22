import axios from 'axios';
axios.defaults.withCredentials = true;

const appK = 'com.herokuapp.reactnotesapp-fwcdga47i';

export const AUTH_USER_AUTHENTICATED = 'AUTH_USER_AUTHENTICATED';
export const AUTH_USER_UNAUTHENTICATED = 'AUTH_USER_UNAUTHENTICATED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_CHECK = 'AUTH_CHECK';
export const AUTH_ERROR_RESET = 'AUTH_ERROR_RESET';

// signup
export const AUTH_SIGNUP_START = 'AUTH_SIGNUP_START';
export const AUTH_SIGNUP_SUCCESS = 'AUTH_SIGNUP_SUCCESS';
export const AUTH_SIGNUP_ERROR = 'AUTH_SIGNUP_ERROR';
export const AUTH_SIGNUP_FINISH = 'AUTH_SIGNUP_FINISH';

// login
export const AUTH_LOGIN_START = 'AUTH_LOGIN_START';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';
export const AUTH_LOGIN_FINISH = 'AUTH_LOGIN_FINISH';

// logout
export const AUTH_LOGOUT_START = 'AUTH_LOGOUT_START';
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';
export const AUTH_LOGOUT_ERROR = 'AUTH_LOGOUT_ERROR';
export const AUTH_LOGOUT_FINISH = 'AUTH_LOGOUT_FINISH';

// notes
export const NOTES_FETCH_START = 'NOTES_FETCH_START';
export const NOTES_FETCH_SUCCESS = 'NOTES_FETCH_SUCCESS';
export const NOTES_FETCH_ERROR = 'NOTES_FETCH_ERROR';
export const NOTES_FETCH_FINISH = 'NOTES_FETCH_FINISH';

export const NOTES_DELETE_START = 'NOTES_DELETE_START';
export const NOTES_DELETE_SUCCESS = 'NOTES_DELETE_SUCCESS';
export const NOTES_DELETE_FINISH = 'NOTES_DELETE_FINISH';

export const AUTH_NOTES_ERROR = 'AUTH_NOTES_ERROR';

// note
export const NOTE_EDIT_START = 'NOTE_EDIT_START';
export const NOTE_EDIT_SUCCESS = 'NOTE_EDIT_SUCCESS';
export const NOTE_EDIT_ERROR = 'NOTE_EDIT_ERROR';
export const NOTE_EDIT_FINISH = 'NOTE_EDIT_FINISH';

export const NOTE_DELETE_START = 'NOTE_DELETE_START';
export const NOTE_DELETE_SUCCESS = 'NOTE_DELETE_SUCCESS';
export const NOTE_DELETE_ERROR = 'NOTE_DELETE_ERROR';
export const NOTE_DELETE_FINISH = 'NOTE_ DELETE_FINISH';

export const NOTE_ADD_START = 'NOTE_ADD_START';
export const NOTE_ADD_SUCCESS = 'NOTE_ADD_SUCCESS';
export const NOTE_ADD_ERROR = 'NOTE_ADD_ERROR';
export const NOTE_ADD_FINISH = 'NOTE_ADDE_FINISH';

const ROOT = 'https://reactnotesapp-fwcdga47i.herokuapp.com/api';

export const resetErrors = _ => {
  return dispatch => {
    dispatch({ type: AUTH_ERROR_RESET });
  };
};

export const authenticateUser = _ => {
  return dispatch => {
    dispatch({ type: AUTH_LOGIN_START });

    axios
      .get(`${ROOT}/users/validate`, {
        headers: { authorization: localStorage.getItem(appK) },
      })
      .then(({ data }) => {
        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data.username });
        dispatch({ type: AUTH_LOGIN_FINISH });
      })
      .catch(err => {
        dispatch({ type: AUTH_LOGIN_ERROR, payload: err.response.data.error });
        dispatch({ type: AUTH_LOGIN_FINISH });
      });
  };
};

export const register = (username, password, confirmPassword, history) => {
  return dispatch => {
    dispatch({ type: AUTH_SIGNUP_START });

    if (!username || !password || !confirmPassword) {
      dispatch({
        type: AUTH_SIGNUP_ERROR,
        payload: 'Please provide all fields.',
      });

      dispatch({ type: AUTH_SIGNUP_FINISH });
      return;
    }

    if (password !== confirmPassword) {
      dispatch({ type: AUTH_SIGNUP_ERROR, payload: 'Passwords do not match.' });

      dispatch({ type: AUTH_SIGNUP_FINISH });
      return;
    }

    axios
      .post(`${ROOT}/users`, { username, password })
      .then(({ data }) => {
        dispatch({ type: AUTH_SIGNUP_SUCCESS, payload: data });

        dispatch({ type: AUTH_LOGIN_START });

        axios
          .post(`${ROOT}/users/login`, { username, password })
          .then(({ data }) => {
            localStorage.setItem(appK, data.token);

            dispatch({ type: AUTH_LOGIN_SUCCESS, payload: username });

            dispatch({ type: AUTH_LOGIN_FINISH });

            dispatch({ type: AUTH_SIGNUP_FINISH });

            history.push('/');
          })
          .catch(err => {
            dispatch({
              type: AUTH_LOGIN_ERROR,
              payload: err.response.data.error,
            });
            dispatch({ type: AUTH_LOGIN_FINISH });

            dispatch({ type: AUTH_SIGNUP_ERROR });
            dispatch({ type: AUTH_SIGNUP_FINISH });
          });
      })
      .catch(err => {
        dispatch({ type: AUTH_SIGNUP_ERROR, payload: err });
        dispatch({ type: AUTH_SIGNUP_FINISH });
      });
  };
};

export const login = (username, password, history) => {
  return dispatch => {
    dispatch({ type: AUTH_LOGIN_START });

    axios
      .post(`${ROOT}/users/login`, { username, password })
      .then(({ data }) => {
        // console.log(data.token);
        dispatch({ type: AUTH_ERROR_RESET });

        localStorage.setItem(appK, data.token);

        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: username });
        dispatch({ type: AUTH_LOGIN_FINISH });

        history.push('/');
      })
      .catch(err => {
        dispatch({
          type: AUTH_LOGIN_ERROR,
          payload: err.response.data.message,
        });
        dispatch({ type: AUTH_LOGIN_FINISH });
      });
  };
};

export const logout = history => {
  return dispatch => {
    dispatch({ type: AUTH_LOGOUT_START });

    localStorage.removeItem(appK);
    dispatch({ type: AUTH_LOGOUT_SUCCESS });

    dispatch({ type: AUTH_LOGOUT_FINISH });

    history.push('/login');
  };
};

export const getNotes = _ => {
  return dispatch => {
    dispatch({ type: NOTES_FETCH_START });

    axios
      .get(`${ROOT}/users/notes`, {
        headers: { authorization: localStorage.getItem(appK) },
      })
      .then(({ data }) => {
        dispatch({ type: NOTES_FETCH_SUCCESS, payload: data });
        dispatch({ type: NOTES_FETCH_FINISH });
      })
      .catch(err => {
        dispatch({ type: AUTH_NOTES_ERROR, payload: err.response.data.error });
        dispatch({ type: NOTES_FETCH_FINISH });
      });
  };
};

export const editNote = note => {
  return dispatch => {
    dispatch({ type: NOTE_EDIT_START });

    axios
      .put(`${ROOT}/notes/${note.id}`, {
        title: note.title,
        content: note.content,
      })
      .then(({ data }) => {
        dispatch({ type: NOTE_EDIT_SUCCESS, payload: data });
        dispatch({ type: NOTE_EDIT_FINISH });
      })
      .catch(err => {
        dispatch({ type: NOTE_EDIT_ERROR, payload: err });
        dispatch({ type: NOTE_EDIT_FINISH });
      });
  };
};

export const deleteNote = id => {
  return dispatch => {
    dispatch({ type: NOTE_DELETE_START });

    axios
      .delete(`${ROOT}/notes/${id}`)
      .then(({ data }) => {
        dispatch({ type: NOTE_DELETE_SUCCESS, payload: data });
        dispatch({ type: NOTE_DELETE_FINISH });
      })
      .catch(err => {
        dispatch({ type: NOTE_DELETE_ERROR, payload: err });
        dispatch({ type: NOTE_DELETE_FINISH });
      });
  };
};

export const addNote = note => {
  return dispatch => {
    dispatch({ type: NOTE_ADD_START });

    axios
      .post(`${ROOT}/notes`, note, {
        headers: { authorization: localStorage.getItem(appK) },
      })
      .then(({ data }) => {
        dispatch({ type: NOTE_ADD_SUCCESS, payload: data });
        dispatch({ type: NOTE_ADD_FINISH });
      })
      .catch(err => {
        dispatch({ type: NOTE_ADD_ERROR, payload: err });
        dispatch({ type: NOTE_ADD_FINISH });
      });
  };
};
