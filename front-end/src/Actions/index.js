import axios from "axios";
export const GETTINGNOTES = "GETTINGNOTES";
export const NOTESRECEIVED = "NOTESRECEIVED";

export const ADDINGNOTE = "ADDINGNOTE";
export const NOTEADDED = "NOTEADDED";

export const UPDATINGNOTE = "UPDATINGNOTE";
export const NOTEUPDATED = "NOTEUPDATED";

export const DELETINGNOTE = "DELETINGNOTE";
export const NOTEDELETED = "NOTEDELETED";

export const LOGGINGIN = "LOGGINGIN";
export const LOGGEDIN = "LOGGEDIN";

export const LOGGEDOUT = "LOGGEDOUT";

export const SIGNNINGUP = "SIGNNINGUP";
export const SIGNEDUP = "SIGNEDUP";

export const ERROR = "ERROR";

const url = "http://localhost:5000";

export const loggedIn = (email, password) => {
  return dispatch => {
    dispatch({ type: LOGGINGIN });
    axios
      .post(`${url}/login`, { email, password })
      .then(response => {
        dispatch({ type: LOGGEDIN, payload: response });
        localStorage.setItem("token", response.data.token);
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const loggedOut = () => {
  return dispatch => {
    dispatch({ type: LOGGINGIN });
  };
};

export const signUp = (email, password) => {
  return dispatch => {
    dispatch({ type: SIGNNINGUP });
    axios
      .post(`${url}/signup`, { email, password })
      .then(response => {
        dispatch({ type: SIGNEDUP, payload: response });
        window.location.reload();
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const getNotes = () => {
  return dispatch => {
    dispatch({ type: GETTINGNOTES });
    axios
      .get(url)
      .then(response => {
        dispatch({ type: NOTESRECEIVED, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: ERROR, payload: error });
      });
  };
};

export const addNote = note => {
  return dispatch => {
    dispatch({ type: ADDINGNOTE });
    axios
      .post(url, note)
      .then(response => {
        dispatch({ type: NOTEADDED, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: ERROR, payload: error });
      });
  };
};

export const updateNote = (note, id) => {
  return dispatch => {
    dispatch({ type: UPDATINGNOTE });
    axios
      .put(`${url}/${id}`)
      .then(response => {
        dispatch({ type: NOTEUPDATED, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: ERROR, payload: error });
      });
  };
};

export const deleteNote = (note, id) => {
  return dispatch => {
    dispatch({ type: DELETINGNOTE });
    axios
      .delete(`${url}/${id}`)
      .then(response => {
        dispatch({ type: NOTEDELETED, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: ERROR, payload: error });
      });
  };
};
