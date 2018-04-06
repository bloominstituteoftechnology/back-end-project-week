import axios from 'axios';

export const NON_MATCH = 'NON_MATCH';
export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const USER_NOT_REGISTERED = 'USER_NOT_REGISTERED';

export const GETTING_NOTES = 'GETTING_NOTES';
export const NOTES_RECEIVED = 'NOTES_RECEIVED';
export const ERROR_GETTING_NOTES = 'ERROR_GETTING_NOTES';

export const GET_NOTE = 'GET_NOTE';
export const NOTE_RECEIVED = 'NOTE_RECEIVED';
export const ERROR_GETTING_NOTE = 'ERROR_GETTING_NOTE';

export const CREATE_NOTE = 'CREATE_NOTE';
export const NOTE_CREATED = 'NOTE_CREATED';
export const ERROR_CREATING_NOTE = 'ERROR_CREATING_NOTE';

export const DELETE_NOTE = 'DELETE_NOTE';
export const NOTE_DELETED = 'NOTE_DELETED';
export const ERROR_DELETING_NOTE = 'ERROR_DELETING_NOTE';

export const UPDATE_NOTE = 'UPDATE_NOTE';
export const NOTE_UPDATED = 'NOTE_UPDATED';
export const ERROR_UPDATING_NOTE = 'ERROR_UPDATING_NOTE';

export const SEARCH = 'SEARCH';
export const RESETSEARCH = 'RESETSEARCH';

const getHeaders = () => {
  let config = {
    headers: {
      authorization: localStorage.getItem('token'),
      userid: localStorage.getItem('id'),
    },
  };
  return config;
}


export const search = (text) => {
  return {
    type: SEARCH,
    payload: text,
  };
};
export const resetSearch = (resetAction) => {
  return {
    type: RESETSEARCH,
    resetAction,
  };
};

export const getNote = (id) => {
  return {
    type: GET_NOTE,
    payload: id,
  };
};

export const getNotes = () => {
  return (dispatch) => {
    dispatch({ type: GETTING_NOTES });
    axios
      .get('http://138.68.51.121/api/notes', getHeaders())
      .then(({ data }) => {
        dispatch({ type: NOTES_RECEIVED, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_GETTING_NOTES, payload: error });
      });
  };
};

export const createNote = (data) => {
  return (dispatch) => {
    dispatch({ type: CREATE_NOTE });
    axios
      .post('http://138.68.51.121/api/note/create', data, getHeaders())
      .then(({ data }) => {
        dispatch({ type: NOTE_CREATED, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_CREATING_NOTE, payload: error });
      });
  };
};

export const deleteNote = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_NOTE });
    axios
      .delete('http://138.68.51.121/api/note/' + id, getHeaders())
      .then(({ data }) => dispatch({ type: NOTE_DELETED, payload: data }))
      .catch((error) => {
        dispatch({ type: ERROR_DELETING_NOTE, payload: error });
      });
  };
};

export const updateNote = (data) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_NOTE });
    axios
      .put('http://138.68.51.121/api/note', data, getHeaders())
      .then(({ data }) => {
        dispatch({ type: NOTE_UPDATED, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_UPDATING_NOTE, payload: error });
      });
  };
};

export const register = (username, password, confirmPassword) => {
  return (dispatch) => {
    if (password !== confirmPassword) {
      dispatch({ type: NON_MATCH });
      return;
    }
    axios
      .post(`http://138.68.51.121/register`, { username, password })
      .then(({ data }) => {
        dispatch({
          type: USER_REGISTERED,
          payload: data,
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.user._id);
      })
      .catch(() => {
        dispatch({
          type: USER_NOT_REGISTERED,
        });
      });
  };
};

export const login = (username, password) => {
  return (dispatch) => {
    axios
      .post('http://138.68.51.121/login', { username, password })
      .then(({ data }) => {
        dispatch({
          type: USER_AUTHENTICATED,
          payload: data,
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.user._id);
      })
      .catch(() => {
        dispatch({
          type: USER_UNAUTHENTICATED,
        });
      });
  };
};

export const logout = () => {
  return { type: USER_UNAUTHENTICATED };
};