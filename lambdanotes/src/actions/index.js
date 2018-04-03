import axios from 'axios';
axios.defaults.withCredentials = true;

const ROOT_URL = 'http://localhost:5000/api';

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';

export const authError = error => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error,
  };
};

export const register = function(username, password, confirmPassword, history) {
  return async dispatch => {
    if (password !== confirmPassword) {
      dispatch(authError('Password does not match.'));
      return;
    }
    try {
      await axios.post(`${ROOT_URL}/users`, { username, password });
      dispatch({ type: USER_REGISTERED });
      history.push('/');
    } catch (err) {
      dispatch(authError('Error registering user.'));
    }
  };
};