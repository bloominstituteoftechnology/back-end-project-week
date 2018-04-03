import axios from 'axios';
import { v4 } from 'uuid';

export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELERE_NOTE';
export const ERROR = 'ERROR';
export const LOGGING_IN = 'LOGGING_IN';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGIN = 'LOGIN';
export const NEWEST_SORT = 'NEWEST_SORT';
export const OLDEST_SORT = 'OLDEST_SORT';
export const SHOW_NOTES = 'SHOW_NOTES';
export const SIGNING_UP = 'SIGN_UP';
export const TITLE_SORT = 'TITLE_SORT';
export const TOGGLE_DELETE = 'TOGGLE_DELETE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const USER_CREATED = 'USER_CREATED';

export const addNote = data => ({
  type: ADD_NOTE,
  id: v4(),
  title: data.title,
  body: data.body,
  created: data.created,
  stamp: data.stamp,
});

export const deleteNote = data => ({
  type: DELETE_NOTE,
  id: data.id,
});

export const error = data => ({
  type: ERROR,
});

export const login = (data) => {
  const user = axios.post('http://localhost:5000/login', {
    email: data.email,
    password: data.password,
  });
  return (dispatch) => {
    dispatch({ type: LOGGING_IN });
    user
      .then((res) => {
        dispatch({ type: LOGGED_IN, payload: res.data.jwtObj });
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

export const updateNote = data => ({
  type: UPDATE_NOTE,
  id: data.id,
  title: data.title,
  body: data.body,
});

export const updateSearch = data => ({
  type: UPDATE_SEARCH,
  input: data.input,
});

export const userCreated = data => ({
  type: USER_CREATED,
});
