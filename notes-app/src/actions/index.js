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
    .post(`${ROOT}/notes`, {
      title: note.title,
      content: note.meat
    })
    .then(response => {
      console.log(response.data);
      dispatch({
        type: 'ADD_NOTE',
        payload: {
          title: response.data.title,
          meat: response.data.content,
          id: response.data._id,
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
  console.log('editing: ', note);

  return dispatch => {
    axios
    .put(`${ROOT}/notes`, note)
    .then(response => {
      console.log(response.data);
      dispatch({
        type: 'EDIT_NOTE',
        payload: note,
      })
    })
    .catch((err) => {
      dispatch(error('Failed to edit note'));
    });
  };
  // return {
  //   type: 'EDIT_NOTE',
  //   payload: note,
  // }
  // return note;
}

export const deleteNote = (note) => {
  console.log('deleting: ', note.title);
  return dispatch => {
    axios
    .delete(`${ROOT}/notes`, { data:
      {
        title: note.title,
        id: note.id,
      }
    })
    .then(response => {
      console.log(response.data);
      dispatch({
        type: 'DELETE_NOTE',
        payload: note.title,
      });
    })
    .catch((err) => {
      dispatch(error('Failed to delete note'));
    });
  };
  // console.log(note);
  // return {
  //   type: 'DELETE_NOTE',
  //   payload: note.title,
  // }
  // return note;
}
