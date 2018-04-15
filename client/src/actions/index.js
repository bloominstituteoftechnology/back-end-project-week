const axios = require("axios");

export const ADD_NOTE = "ADD_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const EDIT_NOTE = "EDIT_NOTE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const NOTES_RETRIEVED = "NOTES_RETRIEVED";

const ROOT_URL = "http://localhost:3030";

let nextNoteID = 0;


export const login = (email, password) => {
  return async dispatch => {
    try {
      const user = await axios.post(`${ROOT_URL}/login`, { email, password });
      const uuID = user.data._id;
      localStorage.setItem("uuID", uuID);
      if (user) dispatch({ type: LOGIN_SUCCESS });
      else dispatch({ type: LOGIN_FAIL });
    } catch (e) {
      console.log("There was a problem with the login action:", e);
      dispatch({ type: LOGIN_FAIL });
    }
  };
};

export const register = (email, password, confirmPassword) => {
  return async dispatch => {
    try {
      const newUser = await axios.post(`${ROOT_URL}/register`, { email, password });
    } catch(e) {
      console.log("There was a problem registering!", e);
    }
  }
}

export const fetchNotes = () => {
  const uuID = localStorage.getItem('uuID');
  return async dispatch => {
    try {
      const allNotes = await axios.get(`${ROOT_URL}/notes/${uuID}`);
      dispatch({
        type: NOTES_RETRIEVED,
        payload: allNotes,
      })
    } catch(e) {
      console.log('There was a problem fetching notes', e);
    }
  }
}

export const addNote = (noteTitle, noteText) => {
  return async dispatch => {
    try {
      const userUID = localStorage.getItem("uuID");
      const res = await axios.post(`${ROOT_URL}/new-note`, { userUID, noteTitle, noteText });
    } catch(e) {
      console.log(e);
    }
  }
};

export const deleteNote = id => {
  console.log("Removing note number: ", id);
  return async dispatch => {
    try {
      const userUID = localStorage.getItem("uuID");
      const res = await axios.delete(`${ROOT_URL}/delete/${id}&${userUID}`, {
        params: {
          userUID: userUID,
          noteUID: id,
        }
      });
    } catch(e) {
      console.log(e);
    }
  } 
};

export const editNote = (newTitle, newText, id) => {

  return async dispatch => {
    try {
      const userUID = localStorage.getItem("uuID");
      const res = await axios.put(`${ROOT_URL}/edit/${id}&${userUID}`, { noteTitle: newTitle, noteText: newText });
    } catch(e) {
      console.log(e);
    }
  }
  // return {
  //   type: EDIT_NOTE,
  //   payload: {
  //     title: newTitle,
  //     text: newText
  //   },
  //   id
  // };
};
