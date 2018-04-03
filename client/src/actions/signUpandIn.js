import axios from 'axios';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION ERROR';
export const USER_CREATED = 'USER_CREATED';

axios.defaults.withCredentials = true;
const ROOT_URL = 'http://localhost:5000/api';

export const authError = error => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error,
  };
};

export const signUp = (username, password, confirmPass, history) => {
  return dispatch => {
    if (password !== confirmPass) {
      dispatch(authError('Passwords do not match'));
      return;
    }
    axios
      .post(`${ROOT_URL}/users`, { username, password })
      .then(() => {
        dispatch({
          type: USER_CREATED,
        });
        history.push('/signin');
      })
      .catch(() => {
        dispatch(authError('Failed to create user'));
      });
  };
};
