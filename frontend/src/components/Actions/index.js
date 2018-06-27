import axios from 'axios';

export const ADD = "ADD";
export const EDIT = "EDIT";
export const ERROR = "ERROR";
export const FETCH = "FETCH";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const THEME = "THEME";

const port = 5500;

// To notesReducer
export const addNote = (uid, note) => async dispatch => {
  const header = { "headers": { "authorization": uid } };
  const response = await axios.post(`http://localhost:${port}/notes`, note, header);
  return dispatch({
    type: ADD,
    payload: response.data
  });
};

export const editNote = (uid, id, note) => async dispatch => {
  const header = { "headers": { "authorization": uid } };
  const response = await axios.post(`http://localhost:${port}/notes/${id}`, note, header);
  return dispatch({
    type: EDIT,
    payload: response.data
  });
};

export const fetchNotes = (uid) => async dispatch => {
  const header = { "headers": { "authorization": uid } };
  const response = await axios.get(`http://localhost:${port}/notes`,header);
  console.log('fetchNotes-response:',response);
  return dispatch({
    type: FETCH,
    payload: response.data
  });
};

export const deleteNote = (uid, id) => async dispatch => {
  const header = { "headers": { "authorization": uid } };
  const response = await axios.delete(`http://localhost:${port}/notes/${id}`,header);
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
