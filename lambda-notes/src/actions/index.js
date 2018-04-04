import axios from 'axios';
import { ROOT_URL } from '../config.js';
axios.defaults.withCredentials = true;

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const GET_NOTES = 'GET_NOTES';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';

export const authError = error => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error
  };
};

export const register = (username, password, confirmPassword, history) => {
  return dispatch => {
    if (password !== confirmPassword) {
      dispatch(authError('Passwords do not match'));
      return;
    }
    axios
      .post(`${ROOT_URL}/api/users/signup`, { username, password })
      .then(() => {
        dispatch({
          type: USER_REGISTERED
        });
        history.push('/signin');
      })
      .catch(() => {
        dispatch(authError('Failed to register user'));
      });
  };
};

export const login = (username, password, history) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/api/users/login`, { username, password })
      .then((res) => {
        console.log('res.data: ', res.data);
        console.log('response: ', res);
        dispatch({
          type: USER_AUTHENTICATED
        });
        history.push('/notes');
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

export const getNotes = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  console.log('token: ', token);
  return dispatch => {
    axios
      .get(`${ROOT_URL}/api/notes`,
      {
        headers: { 
          authorization: token,
          user: userId
        }
      })
      .then(response => {
        console.log('response in actions/index.js line 68: ', response);
        dispatch({
          type: GET_NOTES,
          payload: response.data,
        });
      })
      .catch(() => {
        dispatch(authError('Failed to fetch notes'));
      });
  };
};
