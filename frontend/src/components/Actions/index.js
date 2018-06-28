import axios from 'axios';
import { domain } from '../../config/dev';

export const ADD = "ADD";
export const EDIT = "EDIT";
export const ERROR = "ERROR";
export const FETCH = "FETCH";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SEARCH = "SEARCH";
export const THEME = "THEME";

const port = 5500;

// To notesReducer
export const addNote = (uid, note) => async dispatch => {
  const header = { "headers": { "authorization": uid } };
  const response = await axios.post(`${domain}/notes`, note, header);
  return dispatch({
    type: ADD,
    payload: response.data
  });
};

export const editNote = (uid, id, note) => async dispatch => {
  const header = { "headers": { "authorization": uid } };
  // const response = await axios.put(`${domain}/notes/${id}`, note, header);
  // console.log('editNote response:',response);
  let response;
  try {
    response = await axios.put(`${domain}/notes/${id}`, note, header);
  } catch(error) {
    return dispatch({
      type: ERROR,
      payload: error
    });
  }
  return dispatch({
    type: EDIT,
    payload: response.data
  });
};

export const fetchNotes = (uid) => async dispatch => {
  const header = { "headers": { "authorization": uid } };
  const response = await axios.get(`${domain}/notes`,header);
  console.log('fetchNotes-response:',response);
  return dispatch({
    type: FETCH,
    payload: response.data
  });
};

export const putResultsToStore = (results) => {
  return {
    type: SEARCH,
    payload: results
  };
}

export const deleteNote = (uid, id) => async dispatch => {
  const header = { "headers": { "authorization": uid } };
  const response = await axios.delete(`${domain}/notes/${id}`,header);
  return fetchNotes(uid);
};

// To userReducer

export const sendToken = token => {
  return {
    type: LOGIN,
    payload: token
  };
}

export const loginUser = () => {

};

export const persistUser = () => {

}

export const logoutUser = () => {
  return {
    type: LOGOUT
  };
};

export const changeTheme = (uid, theme) => {

  return {
    type: THEME,
    payload: theme,
  }
}


export const fetchTheme = (uid) => dispatch => {

}
