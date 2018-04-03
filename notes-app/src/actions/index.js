import axios from 'axios';
const ROOT_URL = 'http://localhost:5000/api';


export const error = (error) => {
  return {
    type: 'authentication error',
    payload: error
  };
};

export const addNote = (note) => {
  // return {
  //   type: 'ADD_NOTE',
  //   payload: note,
  // }
  // return note;
  return dispatch => {
    axios
    .post(`${ROOT_URL}/notes`, { headers: { Authorization: window.localStorage.getItem('authorization') } })
    .then(response => {
      dispatch({
        type: 'ADD_NOTE',
        payload: response.data
      });
    })
    .catch(() => {
      dispatch(error('Failed to post new note'));
    });
  };
}

export const editNote = (note) => {
  return {
    type: 'EDIT_NOTE',
    payload: note,
  }
  return note;
}

export const deleteNote = (note) => {
  return {
    type: 'DELETE_NOTE',
    payload: note,
  }
  return note;
}
