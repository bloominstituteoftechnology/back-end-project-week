import axios from 'axios';

export const FETCHING_NOTES = 'FETCHING_NOTES';
export const NOTES_FETCHED = 'NOTES_FETCHED';

export const CREATING_NOTE = 'CREATING_NOTE';
export const NOTE_CREATED = 'NOTE_CREATED';

export const DELETING_NOTE = 'DELETING_NOTE';
export const NOTE_DELETED = 'NOTE_DELETED';

export const EDITING_NOTE = 'EDITING_NOTE';
export const NOTE_EDITED = 'NOTE_EDITED';

export const SINGLE_NOTE = 'SINGLE_NOTE';
export const TOGGLE_UPDATE_NOTE = 'TOGGLE_UPDATE_NOTE';

export const LOGGING_IN = 'LOGGING_IN';
export const LOGGED_IN = 'LOGGED_IN';

export const SIGNING_UP = 'SIGNING_UP';
export const SIGNED_UP = 'SIGNED_UP';

export const LOGGED_OUT = 'LOGGED_OUT';

export const ERROR = 'ERROR';

export const getNotes = () => {
  return dispatch => {
    dispatch({ type: FETCHING_NOTES });
    axios
      .get('http://localhost:3333/notes', {
        headers: { Authorization: window.localStorage.getItem('token') }
      })
      .then(({ data }) => {
        dispatch({ type: NOTES_FETCHED, payload: data });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const createNote = note => {
  return dispatch => {
    dispatch({ type: CREATING_NOTE });
    axios
      .post('http://localhost:3333/notes', note, {
        headers: { Authorization: window.localStorage.getItem('token') }
      })
      .then(({ data }) => {
        dispatch({ type: NOTE_CREATED, payload: data });
      })
      .then(() => {
        dispatch({ type: FETCHING_NOTES });
        axios
          .get('http://localhost:3333/notes', {
            headers: { Authorization: window.localStorage.getItem('token') }
          })
          .then(({ data }) => {
            dispatch({ type: NOTES_FETCHED, payload: data });
          })
          .catch(err => {
            dispatch({ type: ERROR, payload: err });
          });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const deleteNote = id => {
  return dispatch => {
    dispatch({ type: DELETING_NOTE });
    axios({
      url: 'http://localhost:3333/notes',
      method: 'delete',
      data: { id },
      headers: { Authorization: window.localStorage.getItem('token') }
    })
      .then(({ data }) => {
        dispatch({ type: NOTE_DELETED, payload: data });
        dispatch({ type: SINGLE_NOTE, payload: {} });
        axios
          .get('http://localhost:3333/notes', {
            headers: { Authorization: window.localStorage.getItem('token') }
          })
          .then(({ data }) => {
            dispatch({ type: NOTES_FETCHED, payload: data });
          })
          .catch(err => {
            dispatch({ type: ERROR, payload: err });
          });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const toggleShowUpdate = () => {
  return {
    type: TOGGLE_UPDATE_NOTE
  };
};

export const updateNote = note => {
  return {
    type: SINGLE_NOTE,
    payload: note
  };
};

export const editNote = ({ id, name, title, noteText }) => {
  return dispatch => {
    dispatch({ type: EDITING_NOTE });
    axios
      .put(
        `http://localhost:3333/notes/${id}`,
        { title, noteText },
        { headers: { Authorization: window.localStorage.getItem('token') } }
      )
      .then(({ data }) => {
        dispatch({ type: NOTE_EDITED, payload: data });
        axios
          .get('http://localhost:3333/notes', {
            headers: { Authorization: window.localStorage.getItem('token') }
          })
          .then(({ data }) => {
            dispatch({ type: NOTES_FETCHED, payload: data });
          })
          .catch(err => {
            dispatch({ type: ERROR, payload: err });
          });
      })
      .catch(({ err }) => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const stayLoggedIn = _ => {
  return dispatch => {
    dispatch({ type: LOGGED_IN });
  };
};

export const loggedIn = (username, password) => {
  return dispatch => {
    dispatch({ type: LOGGING_IN });
    axios
      .post('http://localhost:3333/users/signin', { username, password })
      .then(res => {
        window.localStorage.setItem('token', res.data.token);
        window.localStorage.setItem('username', username);
        dispatch({ type: LOGGED_IN, payload: res });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const loggedOut = _ => {
  return dispatch => {
    window.localStorage.removeItem('token');
    dispatch({ type: LOGGED_OUT });
    window.location.reload();
  };
};

export const register = (username, password) => {
  return dispatch => {
    dispatch({ type: SIGNING_UP });
    axios
      .post('http://localhost:3333/users/signup', { username, password })
      .then(res => {
        dispatch({ type: SIGNED_UP, payload: res });
        window.location.reload();
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};
