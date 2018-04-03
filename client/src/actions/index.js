const axios = require("axios");

export const ADD_NOTE = "ADD_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const EDIT_NOTE = "EDIT_NOTE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

const ROOT_URL = "http://localhost:3030";

let nextNoteID = 0;

// export const login = async (email, password) => {
//   try {
//     const user = await axios.post('/new-user').json({email, password});
//     const uuid = user._id;
//     localStorage.setItem('uuID', uuid);
//     if (user) return {
//       type: LOGIN_SUCCESS,
//     }
//     else return {
//       type: LOGIN_FAIL,
//     };
//   } catch(e) {
//     console.log('Problem with the login action:', e);
//     return {
//       type: LOGIN_FAIL,
//     }
//   }
// }

export const login = (email, password) => {
  return async dispatch => {
    try {
      const user = await axios.post(`${ROOT_URL}/login`, { email, password });
      console.log("Here's your acct:", user);
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

export const addNote = (noteTitle, noteText) => {
  return async dispatch => {
    try {
      const userUID = localStorage.getItem("uuID");
      const res = await axios.post(`${ROOT_URL}/new-note`, { userUID, noteTitle, noteText })
    } catch(e) {
      console.log(e);
    }
  }
};

export const deleteNote = id => {
  console.log("Removing note number: ", id);
  return {
    type: DELETE_NOTE,
    id
  };
};

export const editNote = (newTitle, newText, id) => {
  return {
    type: EDIT_NOTE,
    payload: {
      title: newTitle,
      text: newText
    },
    id
  };
};
