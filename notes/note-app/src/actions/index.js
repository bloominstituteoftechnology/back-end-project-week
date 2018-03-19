import axios from 'axios';
axios.defaults.withCredentials = true;

// sign up user
export const SIGNUP_USER_START = 'SIGNUP_USER_START';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_ERROR = 'SIGNUP_USER_ERROR';
export const SIGNUP_USER_FINISH = 'SIGNUP_USER_FINISH';
// check login
export const CHECK_LOGIN_START = 'CHECK_LOGIN_START';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const CHECK_LOGIN_FINISH = 'CHECK_LOGIN_FINISH';
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

const SERVER_ROOT = 'http://localhost:5000/api';

export const signUpUser = (user, history) => {
  return dispatch => {
    dispatch({ type: SIGNUP_USER_START });

    axios
      .post(`${SERVER_ROOT}/users`, user)
      .then(({ data }) => {
        dispatch({ type: SIGNUP_USER_SUCCESS, payload: data.username });
        dispatch({ type: SIGNUP_USER_FINISH });
        history.push('/notes');
      })
      .catch(err => {
        dispatch({ type: SIGNUP_USER_ERROR });
        dispatch({ type: SIGNUP_USER_FINISH });
      });
  };
};

// export const checkSignUp = newUser => {
//   return dispatch => {
//     dispatch({ type: SIGNUP_USER_START });
//     setTimeout(_ => {
//       dispatch({ type: SIGNUP_USER_SUCCESS, payload: newUser });
//       dispatch({ type: SIGNUP_USER_FINISH });
//     }, 500);
//   };
// };

export const checkLogin = credentials => {
  return dispatch => {
    dispatch({ type: CHECK_LOGIN_START });
    setTimeout(_ => {
      dispatch({ type: CHECK_LOGIN, payload: credentials });
      dispatch({ type: CHECK_LOGIN_FINISH });
    }, 500);
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
