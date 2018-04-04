import notesData from "../notesData.js";
import axios from "axios";
axios.defaults.withCredentials = true;

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
// using local data, would use axios to get, post, put, and delete
let theNotes = notesData.slice();

const keyGenerator = user => {
  return user + new Date().getTime();
};

export const getNotes = () => {
  var notes = new Promise(function(resolve, reject) {
    resolve(console.log(" "));
  });
  return dispatch => {
    dispatch({ type: RECIEVING_NOTES });
    notes
      .then(() => {
        dispatch({ type: NOTES_RECEIVED, payload: theNotes });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const createNote = note => {
  const newNote = new Promise(function(resolve, reject) {
    resolve((note.id = keyGenerator(note.user)));
  });
  return dispatch => {
    dispatch({ type: CREATING_NOTE });
    newNote
      .then(() => {
        console.log("in actions => NOTES CREATED: ", theNotes);
        dispatch({ type: NOTE_CREATED, payload: note });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const deleteNote = (id, notes) => {
  var deletedNote = new Promise(function(resolve, reject) {
    let newNotes = notes.filter(note => {
      return id !== note.id;
    });
    theNotes = newNotes;
    resolve(theNotes);
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
        history.push("/signin");
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
        console.log("auth header", axios.defaults.headers.common["Authorization"]);
        dispatch({
          type: USER_AUTH
        });
        console.log("Logged in!");
        history.push("/notes");
      })
      .catch(err => {
        dispatch(authErr(err.toString()));
      });
  };
};

//endregion
