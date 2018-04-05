import axios from "axios";
axios.defaults.withCredentials = true;
const jwt = require("jsonwebtoken");

// ==== NOTES variables ====
//region
export const RECIEVING_NOTES = "RECIEVING_NOTES";
export const NOTES_RECEIVED = "NOTES_RECEIVED";
export const CREATING_NOTE = "CREATING_NOTE";
export const NOTE_CREATED = "NOTE_CREATED";
export const ERROR = "ERROR";
export const DELETING_NOTE = "DELETING_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const UPDATING_NOTE = "UPDATING_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const TOGGLE_UPDATE_NOTE = "TOGGLE_UPDATE_NOTE";
export const SINGLE_NOTE = "SINGLE_NOTE";
//endregion

// ==== USERS variables ====
//region

const ROOT_URL = "http://localhost:5000";
export const USER_REG = "USER_REG";
export const USER_AUTH = "USER_AUTH";
export const USER_UNAUTH = "USER_UNAUTH";
export const AUTH_ERR = "AUTH_ERR";
export const GET_JOKES = "GET_JOKES";
export const CHECK_IF_AUTH = "CHECK_IF_AUTH";
//endregion

// ==== NOTES actions ====
//region

export const getNotes = () => {
  return dispatch => {
    dispatch({ type: RECIEVING_NOTES });
  axios 
    .get(`${ROOT_URL}/api/notes`)
      .then(res => {
        console.log(res.data);
        dispatch({ type: NOTES_RECEIVED, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const createNote = (title, content) => {
  const user = localStorage.getItem('uuID');
  const note = {title, content, user};
  return dispatch => {
    dispatch({ type: CREATING_NOTE });
    axios
      .post(`${ROOT_URL}/api/notes`, note)
      .then(res => {
        dispatch({ type: NOTE_CREATED, payload: res.data.note });
      })
      .catch(err => {
        if (err) alert(err);
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const deleteNote = (id, notes) => {
  var deletedNote = new Promise(function(resolve, reject) {
    // let newNotes = notes.filter(note => {
    //   return id !== note.id;
    // });
    // theNotes = newNotes;
    // resolve(theNotes);
  });
  return dispatch => {
    dispatch({ type: DELETING_NOTE });
    deletedNote
      .then(data => {
        dispatch({ type: DELETE_NOTE, payload: data });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const updateNote = updates => {
  var updatedNote = new Promise(function(resolve, reject) {
    let updatedNote = {
      id: updates.id,
      title: updates.title,
      text: updates.text,
      user: updates.user
    };
    let currentNotes = updates.notes.notes;
    let updateIndex = currentNotes.findIndex(
      note => note.id === updatedNote.id
    );
    currentNotes.splice(updateIndex, 1, updatedNote);
    resolve(currentNotes);
  });
  return dispatch => {
    dispatch({ type: UPDATING_NOTE });
    updatedNote
      .then(data => {
        dispatch({ type: UPDATE_NOTE, payload: data });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const toggleShowUpdate = () => {
  return {
    type: TOGGLE_UPDATE_NOTE
  };
};

export const updateSingleNote = note => {
  return {
    type: SINGLE_NOTE,
    payload: note
  };
};
//endregion

// ==== USERS actions ====
//region

export const authErr = err => {
  return {
    type: AUTH_ERR,
    payload: err
  };
};

export const register = (
  username,
  email,
  password,
  confirmPassword,
  history
) => {
  return dispatch => {
    if (password !== confirmPassword) {
      dispatch(authErr("Passwords do not match"));
    }
    if (!username || !email || !password || !confirmPassword) {
      dispatch(authErr("Please fill in all fields"));
    }
    axios
      .post(`${ROOT_URL}/api/users`, { username, email, password })
      .then(user => {
        dispatch({
          type: USER_REG
        });
        history.push("/login");
      })
      .catch(err => {
        dispatch(authErr(err.toString()));
      });
  };
};

export const login = (username, password, history) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/login`, { username, password })
      .then(res => {
        let token = res.data.token;
        axios.defaults.headers.common["Authorization"] = token;
        var decoded = jwt.decode(token, { complete: true });
        localStorage.setItem("uuID", decoded.payload.uID);
        dispatch({
          type: USER_AUTH
        });
        history.push("/notes");
      })
      .catch(err => {
        dispatch(authErr(err.toString()));
      });
  };
};

//endregion
