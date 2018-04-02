import axios from 'axios';
axios.defaults.withCredentials = true;
const ROOT_URL = 'http://localhost:5000/api';

// export const GET_NOTE = 'GET_NOTE'
export const GET_ALL_NOTES = 'GET_ALL_NOTES';
export const CREATE_NOTE = 'CREATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const ERROR = 'ERROR';
// export const USER_REGISTERED = 'USER_REGISTERED';
// export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
// export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
// export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
// export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';

// export const authError = error => {
//   return {
//     type: AUTHENTICATION_ERROR,
//     payload: error
//   };
// };

export const error = error => {
  return {
    type: ERROR,
    payload: error
  };
};

// export const getNote = () => {
//   return dispatch => {
//     axios
//       .get(`${ROOT_URL}/notes`)
//   }
// };

export const getAllNotes = () => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/notes`)
      .then(response => {
        dispatch({
          type: GET_ALL_NOTES,
          payload: response.data
        });
      })
      .catch(() => {
        dispatch(error('Failed to retrieve notes'));
      });
  };
};

export const createNote = (title, content) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/notes`, { title, content })
      .then(() => {
        dispatch({
          type: CREATE_NOTE
        })
      })
      .catch(() => {
        dispatch(error('Failed to create new note'))
      });
  };
};

// export const createNote = (note) => {
//   return {
//     type: CREATE_NOTE,
//     payload: note,
//   }
// }

export const deleteNote = (id) => {
  return {
    type: DELETE_NOTE,
    payload: id,
  }
}

export const editNote = (updatedNote, id) => {
  return {
    type: EDIT_NOTE,
    payload: updatedNote,
    id,
  }
}