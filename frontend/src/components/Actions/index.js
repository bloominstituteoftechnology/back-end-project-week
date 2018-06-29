import axios from 'axios';
import { domain } from '../../config/dev';

export const ADD = "ADD";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const EDIT = "EDIT";
export const ERROR = "ERROR";
export const FETCH = "FETCH";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SEARCH = "SEARCH";
export const THEME = "THEME";

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  };
};

// To notesReducer
export const addNote = (uid, note) => async dispatch => {
  const header = { "headers": { "authorization": uid } };
  // const response = await axios.post(`${domain}/notes`, note, header);
  let response;
  try {
    response = await axios.post(`${domain}/notes`, note, header);
  } catch(error) {
    return dispatch({
      type: ERROR,
      payload: error
    });
  }
  return fetchNotes(uid);
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
  // return dispatch({
  //   type: EDIT,
  //   payload: response.data
  // });
  return fetchNotes(uid);
};

export const fetchNotes = (uid) => async dispatch => {
  const header = { "headers": { "authorization": uid } };

  let response;
  try {
    response = await axios.get(`${domain}/notes`,header);
  } catch(error) {
    return dispatch({
      type: ERROR,
      payload: error
    });
  }

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
  try {
    const response = await axios.delete(`${domain}/notes/${id}`, header);
    console.log('deleteNote response:',response);
  } catch (error) {
    console.log('deleteNote error:',error);
    return dispatch({
      type: ERROR,
      payload: error
    });
  }
  return fetchNotes(uid);
};

export const shareNote = (uid, id, info) => async dispatch => {
  const header = { "headers": { "authorization": uid } };
  try {
    const response = await axios.post(`${domain}/notes/${id}/share`, info, header);
    console.log('shareNote response:',response);
  } catch (error) {
    console.log('shareNote error:',error);
    return dispatch({
      type: ERROR,
      payload: error
    });
  }
  return fetchNotes(uid);
}

// To userReducer

export const sendToken = token => {
  return {
    type: LOGIN,
    payload: token
  };
}

export const loginUser = () => {

};

export const logoutUser = () => {
  localStorage.removeItem('token');
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
