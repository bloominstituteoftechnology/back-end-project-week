import axios from 'axios';
axios.defaults.withCredentials = true;

const ROOT_URL = `http://localhost:5000/api`;

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const GET_NOTES = 'GET_NOTES';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';

export const authError = error => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error,
  };
};

export const signUp = (email, password, confirmPassword, history) => {
  return dispatch => {
    console.log({ email: email, password: password });
    if (password !== confirmPassword) {
      dispatch(authError('Passwords do not match'));
      return;
    }
    axios
      .post(`${ROOT_URL}/users`, { email, password })
      .then(() => {
        dispatch({
          type: USER_REGISTERED,
        });
        history.push('/login');
      })
      .catch(() => {
        dispatch(authError('Failed to register user'));
      });
  };
};

export const login = (email, password, history) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/login`, { email, password })
      .then(res => {
        console.log('res.data: ', res.data);
        console.log('response: ', res);
        dispatch({
          type: USER_AUTHENTICATED,
        });
        history.push('/notes/get');
        //localStorage.setItem('token', res.data.token);
        //localStorage.setItem('userId', res.data.userId);
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
      .get(`${ROOT_URL}/notes/get`, {
        headers: {
          // authorization: token,
          user: userId,
        },
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
