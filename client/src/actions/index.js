import axios from "axios";

export function saveNoteInStore(note) {
  return {
    type: 'SAVE_NOTE',
    payload: note
  }
}

export function updateNoteInStore(note) {
  return {
    type: 'UPDATE_NOTE',
    payload: note
  }
}

export function deleteNoteInStore(noteId) {
  return {
    type: 'DELETE_NOTE',
    payload: noteId
  }
}

export function getNotes() {
  return dispatch => axios({
    method: "GET",
    url: "http://localhost:5000/api/notes",
    headers: {"Authorization": window.localStorage.getItem("jwt_token")}
  }).then(res => dispatch({
    type: "GET_NOTES",
    payload: res.data
  }))
}

// Only three action creators=> My reducer will be small=> I will use only one reducer.