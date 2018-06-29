import axios from "axios";
export const DELETE_NOTE = "DELETE_NOTE";
export const EDIT_NOTE = "EDIT_NOTE";
export const CREATE_NOTE = "CREATE_NOTE";
// export const PENDING = "PENDING";
// export const ERROR = "ERROR";
// export const FETCH_NOTES = "FETCH_NOTES";

export const deleteNote = id => {
  return {
    type: DELETE_NOTE,
    payload: id
  };
};

export const editNote = noteData => {
  return {
    type: EDIT_NOTE,
    payload: noteData
  };
};

export const createNote = noteData => {
  return {
    type: CREATE_NOTE,
    payload: noteData
  };
};

// export const fetchNotes = reqOpt => {
//   const getNotes = axios.get(
//     "https://lambda-note.herokuapp.com/api/notes",
//     reqOpt
//   );
//   return function(dispatch) {
//     getNotes
//       .then(response => {
//         console.log(response);
//         dispatch({ type: FETCH_NOTES, payload: response.data });
//       })
//       .catch(err => {
//         dispatch({ type: ERROR, payload: err });
//       });
//   };
// };

// export const editNote = (id, editedNote) => {
//   const modifyNote = axios.put(
//     `https://max-lambda-notes-app.herokuapp.com.api/note/${id}`,
//     editedNote
//   );
//   return function(dispatch) {
//     modifyNote
//       .then(response => {
//         dispatch({ type: EDIT_NOTE, payload: response.data });
//         console.log(response.data);
//       })
//       .catch(err => {
//         dispatch({ type: ERROR, payload: err });
//       });
//   };
// };

// export const deleteNote = id => {
//   const noteDeletion = axios.delete(
//     `https://max-lambda-notes-app.herokuapp.com/api/note/${id}`
//   );
//   return function(dispatch) {
//     noteDeletion
//       .then(response => {
//         dispatch({ type: DELETE_NOTE, payload: response.data });
//         console.log(response.data)
//       })
//       .catch(err => {
//         dispatch({ type: ERROR, payload: err });
//       });
//   };
// };

// export const createNote = noteData => {
//   const createANote = axios.post(
//     "https://max-lambda-notes-app.herokuapp.com/api/note",
//     noteData
//   );
//   return function(dispatch) {
//     dispatch({ type: PENDING });
//     createANote
//       .then(response => {
//         dispatch({ type: CREATE_NOTE, payload: response.data });
//       })
//       .catch(err => {
//         dispatch({ type: ERROR, payload: err });
//       });
//   };
// };
