import axios from 'axios';

axios.defaults.withCredentials = true;

const ROOT_URL = 'http://localhost:5000/api';

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';

export const FETCHING_NOTES = 'FETCHING_NOTES';
export const FETCHED_NOTES = 'FETCHED_NOTES';
export const CREATING_NOTE = 'CREATING_NOTE';
export const CREATED_NOTE = 'CREATED_NOTE';
export const EDITING_NOTE = 'EDITING_NOTE';
export const EDITED_NOTE = 'EDITED_NOTE';
export const DELETING_NOTE = 'DELETING_NOTE';
export const DELETED_NOTE = 'DELETE_NOTE';
export const TOGGLE_DELETE = 'TOGGLE_DELETE';
export const NOTES_ERROR = 'NOTES_ERROR';

export const authError = (error) => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error
  };
};

export const createUser = (user) => {
  const { username, password, confirmPassword, history } = user;
  return dispatch => {
    if (password !== confirmPassword) {
      dispatch(authError('Passwords do not match'));
      return;
    }
    axios
      .post(`${ROOT_URL}/signup`, { username, password })
      .then((response) => {
        dispatch({
          type: USER_REGISTERED
          // payload: response
        });
        history.push('/signin');
        // window.localStorage.setItem('token', response.data.token);
      })
      .catch(() => {
        dispatch(authError('Failed to register user'));
      });
  };
};

export const login = (user) => {
  const {
    username,
    password,
    history
  } = user;
  return dispatch => {
    axios
      .post(`${ROOT_URL}/login`, { username, password })
      .then((response) => {
        dispatch({
          type: USER_AUTHENTICATED
          // payload: response
        });
        localStorage.setItem('authorization', response.data.token);
        history.push('/notes');
      })
      .catch(() => {
        dispatch(authError('Incorrect username or password'));
      });
  };
};

export const logout = (user) => {
  const { history } = user;
  return dispatch => {
    dispatch({
      type: USER_UNAUTHENTICATED
    });
    localStorage.removeItem('authorization');
    history.push('/signin');
    // window.location.reload();
  };
};

export const checkIfLoggedIn = () => {
  return dispatch => {
    dispatch({ 
      type: CHECK_IF_AUTHENTICATED 
    });
  }
}

export const getNotes = () => {
  return dispatch => {
    dispatch({
      type: FETCHING_NOTES
    });
    axios
      .get(`${ROOT_URL}/notes`, { headers: { Authorization: localStorage.getItem('authorization') } })
      .then(({ data }) => {
        dispatch({
          type: FETCHED_NOTES,
          payload: data
        });
      })
      .catch(error => {
        dispatch({
          type: NOTES_ERROR,
          payload: error
        });
      });
  };
};

export const createNote = (note) => {
  // return {
  //   type: CREATE_NOTE,
  //   payload: note
  // };
  return dispatch => {
    dispatch({ 
      type: CREATING_NOTE 
    });
    axios
      .post(`${ROOT_URL}/new`, note, { headers: { Authorization: localStorage.getItem('authorization') } })
      .then(({ data }) => {
        dispatch({
          type: CREATED_NOTE,
          payload: data
        });
      })
      .catch(error => {
        dispatch({
          type: NOTES_ERROR,
          payload: error
        });
      });
  };
};

export const editNote = (note) => {
  // return {
  //   type: EDIT_NOTE,
  //   payload: note
  // };
  return dispatch => {
    dispatch({
      type: EDITING_NOTE
    });
    axios
      .put(`${ROOT_URL}/edit`, note)
        .then(({ data }) => {
          return axios
            .get(`${ROOT_URL}/notes`, { headers: { Authorization: localStorage.getItem('authorization') } })
            .then(({ data }) => {
              dispatch({ 
                type: EDITED_NOTE,
                payload: data 
              });
            })
        })
        .catch(error => {
          dispatch({
            type: NOTES_ERROR,
            payload: error
          });
        });
  };
};

export const deleteNote = (id) => {
  // return {
  //   type: DELETE_NOTE,
  //   payload: id
  // };
  return dispatch => {
    dispatch({
      type: DELETING_NOTE
    });
    axios
      .delete(`${ROOT_URL}/delete/${id}`)
      .then(({ data }) => {
        return axios
          .get(`/notes`, { headers: { Authorization: localStorage.getItem('authorization') } })
          .then(({ data }) => {
            dispatch({
              type: DELETED_NOTE,
              payload: data
            });
          })
      })
      .catch(error => {
        dispatch({ 
          type: NOTES_ERROR,
          payload: error
         });
      });
  };
};

export const toggleDelete = (id) => {
  // return {
  //   type: TOGGLE_DELETE,
  //   payload: id
  // };
  return dispatch => {
    axios
      .delete(`${ROOT_URL}/delete/${id}`, { headers: { Authorization: localStorage.getItem('authorization') } })
      .then(response => {
        dispatch({
          type: TOGGLE_DELETE,
          payload: id
        });
      })
      .catch(() => {
        dispatch(authError('Failed to delete note'));
      });
  };
};