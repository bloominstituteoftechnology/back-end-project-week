import axios from 'axios';
const ROOT = 'http://localhost:5000/api';


export const error = (error) => {
  return {
    type: 'error',
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
    .post(`http://localhost:5000/api/notes`, {
      title: note.title,
      content: note.meat
    })
    .then(response => {
      console.log(response);
      dispatch({
        type: 'ADD_NOTE',
        payload: {
          title: response.data.title,
          meat: response.data.content
        }
      });
    })
    .catch((err) => {
      console.log(note);
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
