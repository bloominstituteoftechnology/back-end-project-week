import axios from 'axios';

export const GETTING_NOTES = 'GETTING_NOTES';
export const NOTES_RECEIVED = 'NOTES_RECEIVED';
export const ERROR_GETTING_NOTES = 'ERROR_GETTING_NOTES';

export const GET_NOTE = 'GET_NOTE';
export const NOTE_RECEIVED = 'NOTE_RECEIVED';
export const ERROR_GETTING_NOTE = 'ERROR_GETTING_NOTE';

export const CREATE_NOTE = 'CREATE_NOTE';
export const NOTE_CREATED = 'NOTE_CREATED';
export const ERROR_CREATING_NOTE = 'ERROR_CREATING_NOTE';

export const DELETE_NOTE = 'DELETE_NOTE';
export const NOTE_DELETED = 'NOTE_DELETED';
export const ERROR_DELETING_NOTE = 'ERROR_DELETING_NOTE';

export const UPDATE_NOTE = 'UPDATE_NOTE';
export const NOTE_UPDATED = 'NOTE_UPDATED';
export const ERROR_UPDATING_NOTE = 'ERROR_UPDATING_NOTE';

export const SEARCH = 'SEARCH';
export const RESETSEARCH = 'RESETSEARCH';

export const search = (text) => {
  return {
    type: SEARCH,
    payload: text,
  };
};
export const resetSearch = (resetAction) => {
  return {
    type: RESETSEARCH,
    resetAction,
  };
};

export const getNote = (id) => {
  return {
      type: GET_NOTE,
      payload: id,
  }
};

export const getNotes = () => {
  return (dispatch) => {
    dispatch({ type: GETTING_NOTES });
    axios
      .get('http://localhost:5000/api/notes')
      .then(({ data }) => {
        dispatch({ type: NOTES_RECEIVED, payload: data })
      })
      .catch((error) => {
        dispatch({ type: ERROR_GETTING_NOTES, payload: error });
      });
  };
};

export const createNote = (data) => {
  return (dispatch) => {
    dispatch({ type: CREATE_NOTE });
    axios
      .post('http://localhost:5000/api/note/create', data)
      .then(({ data }) => {
        dispatch({ type: NOTE_CREATED, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_CREATING_NOTE, payload: error });
      });
  };
};

export const deleteNote = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_NOTE });
    axios
      .delete('http://localhost:5000/api/note/' + id)
      .then(({ data }) => dispatch({ type: NOTE_DELETED, payload: data }))
      .catch((error) => {
        dispatch({ type: ERROR_DELETING_NOTE, payload: error });
      });
  };
};

export const updateNote = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch({ type: UPDATE_NOTE });
    axios
      .put('http://localhost:5000/api/note', data)
      .then(({ data }) => {
        dispatch({ type: NOTE_UPDATED, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_UPDATING_NOTE, payload: error });
      });
  };
};

// export const addNote = (note) => {
//     return {
//         type: ADDNOTE,
//         payload: note
//     }
// };
// export const updateNote = (note) => {
//     return {
//         type: UPDATENOTE,
//         payload: note,
//     }
// };
// export const deleteNote = (id) => {
//     return {
//         type: DELETENOTE,
//         payload: id,
//     }
// };
