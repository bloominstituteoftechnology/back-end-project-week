import axios from 'axios';
axios.defaults.withCredentials = true;

const { appK } = require('../config');

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

export const AUTH_NOTES_ERROR = 'AUTH_NOTES_ERROR';

// reset error
export const RESET_ERROR = 'RESET_ERROR';
// reset sign up
export const RESET_SIGN_UP = 'RESET_SIGN_UP';
// sign out
export const SIGN_OUT = 'SIGN_OUT';
// when backend is implemented
export const NOTES_FETCHING = 'NOTES_FETCHING';
export const ADD_NOTE = 'ADD_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const DELETE_NOTES_ALL = 'DELETE_NOTES_ALL';

const ROOT = 'http://localhost:5000/api';

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
            dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data });
            dispatch({ type: AUTH_LOGIN_FINISH });

            dispatch({ type: AUTH_SIGNUP_FINISH });

            history.push('/');
          })
          .catch(err => {
            dispatch({ type: AUTH_LOGIN_ERROR, payload: err });
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

// export const checkSignUp = newUser => {
//   return dispatch => {
//     dispatch({ type: AUTH_SIGNUP_START });
//     setTimeout(_ => {
//       dispatch({ type: AUTH_SIGNUP_SUCCESS, payload: newUser });
//       dispatch({ type: AUTH_SIGNUP_FINISH });
//     }, 500);
//   };
// };

export const login = (username, password, history) => {
  return dispatch => {
    dispatch({ type: AUTH_LOGIN_START });

    axios
      .post(`${ROOT}/users/login`, { username, password })
      .then(({ data }) => {
        // console.log(data.token);
        dispatch({ type: AUTH_ERROR_RESET });

        localStorage.setItem(appK, data.token);

        dispatch({ type: AUTH_LOGIN_SUCCESS });
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

    // axios
    //   .post(`${ROOT}/login`, credentials)
    //   .then(({ data }) => {
    //     dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data });
    //     dispatch({ type: AUTH_LOGIN_FINISH });
    //     history.push('/notes');
    //   })
    //   .catch(err => {
    //     dispatch({ type: AUTH_LOGIN_ERROR, payload: err });
    //     dispatch({ type: AUTH_LOGIN_FINISH });
    //   });
  };
};

// export const validateToken = _ => {
//   return dispatch => {
//     dispatch({ type: TOKEN_VALIDATE_START });

//     axios.post('http://localhost:5000/validate', {
//       headers: { authorization: localStorage.getItem(appK) },
//     }).then(({data}) => {

//     })
//   };
// };

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
      .get(`${ROOT}/notes`, {
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

export const resetError = _ => {
  return {
    type: RESET_ERROR,
  };
};

export const resetSignUp = _ => {
  return {
    type: RESET_SIGN_UP,
  };
};

export const signOut = username => {
  return {
    type: SIGN_OUT,
    payload: username,
  };
};

export const addNote = note => {
  return {
    type: ADD_NOTE,
    payload: note,
  };
};

export const editNote = note => {
  return {
    type: EDIT_NOTE,
    payload: note,
  };
};

export const deleteNote = noteId => {
  return {
    type: DELETE_NOTE,
    payload: noteId,
  };
};

export const deleteAllNotes = _ => {
  return {
    type: DELETE_NOTES_ALL,
  };
};
