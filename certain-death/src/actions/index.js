import axios from 'axios';
// import { v4 } from 'uuid';

export const ADDING_NOTE = 'ADD_NOTE';
export const ADDED_NOTE = 'ADDED_NOTE';
export const DELETING_NOTE = 'DELETING_NOTE';
export const DELETED_NOTE = 'DELETE_NOTE';
export const ERROR = 'ERROR';
export const GETTING_NOTES = 'GETTING_NOTES';
export const GOT_NOTES = 'GOT_NOTES';
export const LOGGING_IN = 'LOGGING_IN';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGIN = 'LOGIN';
export const NEWEST_SORT = 'NEWEST_SORT';
export const OLDEST_SORT = 'OLDEST_SORT';
export const SHOW_NOTES = 'SHOW_NOTES';
export const SIGNING_UP = 'SIGN_UP';
export const TITLE_SORT = 'TITLE_SORT';
export const TOGGLE_DELETE = 'TOGGLE_DELETE';
export const UPDATING_NOTE = 'UPDATING_NOTE';
export const UPDATED_NOTE = 'UPDATED_NOTE';
export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const USER_CREATED = 'USER_CREATED';

export const addNote = (data) => {
  const config = {
    headers: {
      Authorization: localStorage.getItem('notesToken'),
    }
  };
  const {
    title, body, created, stamp
  } = data;
  const note = axios.post('http://localhost:5000/newnote', {
    title, body, created, stamp,
  }, config);
  return (dispatch) => {
    dispatch({ type: ADDING_NOTE });
    note
      .then(({ newNote }) => {
        dispatch({ type: ADDED_NOTE, payload: newNote });
      })
      .catch((err) => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const deleteNote = (data, history) => {
  const config = {
    headers: {
      Authorization: localStorage.getItem('notesToken'),
      id: data.id,
    },
  };
  const note = axios.delete('http://localhost:5000/deletenote', config);
  return (dispatch) => {
    dispatch({ type: DELETING_NOTE });
    note
      .then((deletedNote) => {
        dispatch({ type: DELETED_NOTE, payload: deletedNote });
      })
      .catch((err) => {
        dispatch({ type: ERROR, payload: err });
      });
    history.push('/list');
  };
};

export const error = data => ({
  type: ERROR,
});

export const getNotes = (data) => {
  const config = {
    headers: {
      Authorization: localStorage.getItem('notesToken'),
    }
  };
  const notes = axios.get('http://localhost:5000/getnotes', config);
  return (dispatch) => {
    dispatch({ type: GETTING_NOTES });
    notes
      .then((userNotes) => {
        dispatch({ type: GOT_NOTES, payload: userNotes.data.notes });
      })
      .catch((err) => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const login = (data, history) => {
  const user = axios.post('http://localhost:5000/login', {
    email: data.email,
    password: data.password,
  });
  return (dispatch) => {
    dispatch({ type: LOGGING_IN });
    user
      .then((res) => {
        localStorage.setItem('notesToken', res.data.token);
        dispatch({ type: LOGGED_IN, payload: res.data.token });
        history.push('/list');
      })
      .catch((err) => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const newestSort = data => ({
  type: NEWEST_SORT,
});

export const oldestSort = data => ({
  type: OLDEST_SORT,
});

export const showNotes = data => ({
  type: SHOW_NOTES,
});

export const signup = (data) => {
  const user = axios.post('http://localhost:5000/register', {
    email: data.email,
    password: data.password,
  });
  return (dispatch) => {
    dispatch({ type: SIGNING_UP });
    user
      .then(({ newUser }) => {
        dispatch({ type: USER_CREATED, payload: newUser });
        alert('You are registered. Please login below.');
      })
      .catch((err) => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const titleSort = data => ({
  type: TITLE_SORT,
});

export const toggleDelete = data => ({
  type: TOGGLE_DELETE,
});

export const updateNote = (data, history) => {
  const config = {
    headers: {
      Authorization: localStorage.getItem('notesToken'),
    }
  };
  const {
    title, body, id
  } = data;
  const note = axios.put('http://localhost:5000/updatenote', {
    title, body, id,
  }, config);
  return (dispatch) => {
    dispatch({ type: UPDATING_NOTE });
    note
      .then((updatedNote) => {
        dispatch({ type: UPDATED_NOTE, payload: updatedNote });
      })
      .catch((err) => {
        dispatch({ type: ERROR, payload: err });
      });
    history.push(`/fullnote/${id}`);
  };
};

export const updateSearch = data => ({
  type: UPDATE_SEARCH,
  input: data.input,
});

export const userCreated = data => ({
  type: USER_CREATED,
});
