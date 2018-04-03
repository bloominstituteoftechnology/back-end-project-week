import { v4 } from 'uuid';
import axios from 'axios';

export const ADD_NOTE = 'ADD_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELERE_NOTE';
export const TOGGLE_DELETE = 'TOGGLE_DELETE';
export const TITLE_SORT = 'TITLE_SORT';
export const NEWEST_SORT = 'NEWEST_SORT';
export const OLDEST_SORT = 'OLDEST_SORT';
export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const SHOW_NOTES = 'SHOW_NOTES';
export const LOGIN = 'LOGIN';
export const SIGNING_UP = 'SIGN_UP';
export const USER_CREATED = 'USER_CREATED';
export const ERROR = 'ERROR';

export const addNote = data => ({
  type: ADD_NOTE,
  id: v4(),
  title: data.title,
  body: data.body,
  created: data.created,
  stamp: data.stamp,
});

export const updateNote = data => ({
  type: UPDATE_NOTE,
  id: data.id,
  title: data.title,
  body: data.body,
});

export const deleteNote = data => ({
  type: DELETE_NOTE,
  id: data.id,
});

export const toggleDelete = data => ({
  type: TOGGLE_DELETE,
});

export const titleSort = data => ({
  type: TITLE_SORT,
});

export const newestSort = data => ({
  type: NEWEST_SORT,
});

export const oldestSort = data => ({
  type: OLDEST_SORT,
});

export const updateSearch = data => ({
  type: UPDATE_SEARCH,
  input: data.input,
});

export const showNotes = data => ({
  type: SHOW_NOTES,
});

export const signup = (data) => {
  const user = axios.post('http://localhost:5000/', {
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

export const login = data => ({
  type: LOGIN,
});
