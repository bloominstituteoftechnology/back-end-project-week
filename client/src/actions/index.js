import { URL } from "../constants";

import axios from "axios";

export const FETCHING_NOTES = "FETCHING_NOTES";
export const FETCH_NOTES = "FETCH_NOTES";
export const FETCHING_NOTE = "FETCHING_NOTE";
export const FETCH_NOTE = "FETCH_NOTE";
export const ADD_NOTE = "ADD_NOTE";
export const EDIT_NOTE = "EDIT_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";

export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const SHOW_EDIT = "SHOW_EDIT";
export const HIDE_EDIT = "HIDE_EDIT";

export const SORT = "SORT";

export const TOGGLE_SORT = "TOGGLE_SORT";

export const SEARCH = "SEARCH";

export const LOGIN = "LOGIN";

export const fetchNotes = (header, history) => dispatch => {
  dispatch({ type: FETCHING_NOTES });
  axios
    .get(`${URL}/notes`, header)
    .then(res => dispatch({ type: FETCH_NOTES, payload: res.data }))
    .catch(err => {
      localStorage.removeItem("token");
      history.push("/login");
      console.log(err);
    });
};

export const fetchNote = (id, header, history) => dispatch => {
  dispatch({ type: FETCHING_NOTE });
  axios
    .get(`${URL}/notes/${id}`, header)
    .then(res => dispatch({ type: FETCH_NOTE, payload: res.data }))
    .catch(err => {
      localStorage.removeItem("token");
      history.push("/login");
      console.log(err);
    });
};

export const addNote = (note, header, history) => dispatch => {
  axios
    .post(`${URL}/notes`, note, header)
    .then(res => {
      note.id = res.data.success;
      dispatch({ type: ADD_NOTE, payload: res.data.note });
    })
    .catch(err => {
      localStorage.removeItem("token");
      history.push("/login");
      console.log(err);
    });
};

export const editNote = (note, header, history) => dispatch => {
  axios
    .put(`${URL}/notes/${note.id}`, note, header)
    .then(res => {
      dispatch({ type: EDIT_NOTE, payload: res.data.note });
    })
    .catch(err => {
      localStorage.removeItem("token");
      history.push("/login");
      console.log(err);
    });
};

export const deleteNote = (id, header, history) => dispatch => {
  axios
    .delete(`${URL}/notes/${id}`, header)
    .then(() => dispatch({ type: DELETE_NOTE, payload: id }))
    .catch(err => {
      localStorage.removeItem("token");
      history.push("/login");
      console.log(err);
    });
};

export const openModal = () => ({ type: OPEN_MODAL });

export const closeModal = () => ({ type: CLOSE_MODAL });

export const displayEditForm = () => ({ type: SHOW_EDIT });

export const hideEditForm = () => ({ type: HIDE_EDIT });

export const toggleSort = () => ({ type: TOGGLE_SORT });

export const sortList = criteria => ({ type: SORT, payload: criteria });

export const searchList = criteria => ({ type: SEARCH, payload: criteria });

export const setLogin = () => ({ type: LOGIN });
