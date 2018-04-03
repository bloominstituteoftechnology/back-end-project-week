import axios from 'axios';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION ERROR';
export const USER_CREATED = 'USER_CREATED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';

axios.defaults.withCredentials = true;
const ROOT_URL = 'http://localhost:5000/api';

export const authError = error => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error,
  };
};

export const signUp = (email, password, confirmPass, history) => {
  return dispatch => {
    if (password !== confirmPass) {
      dispatch(authError('Passwords do not match'));
      return;
    }
    axios
      .post(`${ROOT_URL}/users`, { email, password })
      .then(() => {
        dispatch({
          type: USER_CREATED,
        });
        history.push('/login');
      })
      .catch(() => {
        dispatch(authError('Failed to create user'));
      });
  };
};

export const login = (email, password, history) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/login`, { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        dispatch({
          type: USER_AUTHENTICATED,
        });
        history.push('/');
      })
      .catch(() => {
        dispatch(authError('Incorrect email and/or password'));
      });
  };
};

export const logout = () => {
  return { type: USER_UNAUTHENTICATED };
};
