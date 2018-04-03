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
      .get(`${ROOT_URL}/api/users`, {headers})
      .then(response => {
        dispatch({
          type: GET_USERS,
          payload: response.data
        });
      })
      .catch(() => {
        dispatch(authError('Failed to fetch users!'));
      });
  };
};

//=====================================
//            UI Actions
//=====================================

export const addNote = (added) => {
  return {
    type: ADD_NOTE,
    payload: added,
  };
};

export const editNote = (edited, id) => {
  return {
    type: EDIT_NOTE,
    payload: edited,
    id: id,
  };
};

export const deleteNote = (deleted) => {
  return {
    type: DELETE_NOTE,
    payload: deleted.id,
  };
};

