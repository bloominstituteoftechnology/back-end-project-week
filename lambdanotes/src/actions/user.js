import axios from "axios";

axios.defaults.withCredentials = true;
const ROOT_URL = "http://localhost:5000";

export const USER_REGISTERED = "USER_REGISTERED";
export const USER_AUTHENTICATED = "USER_AUTHENTICATED";
export const USER_UNAUTHENTICATED = "USER_UNAUTHENTICATED";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";
export const CHECK_IF_AUTHENTICATED = "CHECK_IF_AUTHENTICATED";

export const authError = error => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error
  };
};

export const register = values => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    history
  } = values;
  return dispatch => {
    if (password !== confirmPassword) {
      dispatch(authError("Passwords do not match"));
      return;
    }
    axios
      .post(`/api/user`, { firstName, lastName, email, password })
      .then(() => {
        dispatch({
          type: USER_REGISTERED
        });
        history.push("/login");
      })
      .catch(() => {
        dispatch(authError("Failed to register user"));
      });
  };
};

export const login = values => {
  const { email, password, history } = values;
  return dispatch => {
    axios
      .post(`/api/login`, { email, password })
      .then(response => {
        dispatch({
          type: USER_AUTHENTICATED
        });
        localStorage.setItem("authorization", response.data.token);
        history.push("/notes");
      })
      .catch(() => {
        dispatch(authError("Incorrect username or password"));
      });
  };
};

export const logout = values => {
  const { history } = values;
  return dispatch => {
    dispatch({
      type: USER_UNAUTHENTICATED
    });
    localStorage.removeItem("authorization");
    history.push("/login");
  };
};
