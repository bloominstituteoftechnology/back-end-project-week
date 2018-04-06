import axios from 'axios';
axios.defaults.withCredentials = true;
const ROOT_URL = 'http://localhost:5000';

export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';

export const ADD_NOTE = 'ADD_NOTE';
export const UPDATE_SELECTED = 'UPDATE_SELECTED';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';

export const authError = error => {
   return {
      type: AUTHENTICATION_ERROR,
      payload: error,
   };
};

export const register = (username, password, confirmPassword, history) => {
   return dispatch => {
      if (password !== confirmPassword) {
         dispatch(authError('Passwords do not mtach'));
         return;
      }
      axios
         .post(`${ROOT_URL}/signup`, { username, password })
         .then(() => {
            dispatch({ type: USER_REGISTERED });
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
         .then(result => {
            dispatch({ type: USER_AUTHENTICATED });
            localStorage.setItem('token', result.data.token);
            history.push('/home');
         })
         .catch(() => {
            dispatch(authError('Incorrect username or password'));
         });
   };
};

export const logout = () => {
  return dispatch => {
    axios.post(`${ROOT_URL}/logout`).then(() => {
      dispatch({ type: USER_UNAUTHENTICATED });
    }).catch(() => {
      dispatch(authError('Failed to log you out'));
    });
  };
};

let nextNoteId = 1;
export const addNote = noteObj => {
   return {
      type: ADD_NOTE,
      id: nextNoteId++,
      payload: noteObj,
   };
};

export const updateSelected = id => {
   return {
      type: UPDATE_SELECTED,
      payload: id,
   };
};

export const deleteNote = id => {
   return {
      type: DELETE_NOTE,
      payload: id,
   };
};

export const editNote = noteObj => {
   return {
      type: EDIT_NOTE,
      payload: noteObj,
   };
};
