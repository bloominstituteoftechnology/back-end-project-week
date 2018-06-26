import axios from 'axios';

export const ERROR = "ERROR";
export const FETCH = "FETCH";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const THEME = "THEME";

const port = 5500;
// To notesReducer
export const addNote = (uid, note) => async dispatch => {

};

export const editNote = (uid, id, note) => async dispatch => {

};

export const fetchNotes = (uid) => async dispatch => {
  const header = { "headers": { "authorization": uid } };
//   const response = await axios.get(`http://localhost:${port}/notes`,header);
//   return dispatch({
//     type: FETCH,
//     payload: response.body
//   });
  axios.get(`http://localhost:${port}/notes`,header)
    .then(res => {
      return dispatch({
        type: FETCH,
        payload: res.data
      });
    })
    .catch(error => console.log(error));
};

export const deleteNote = (uid, id) => async dispatch => {

};

// To userReducer

export const sendToken = token => {
  return {
    type: LOGIN,
    payload: token
  };
}

export const loginUser = () => {

};

export const persistUser = () => {

}

export const logoutUser = () => {

};

export const changeTheme = (uid, theme) => {

  return {
    type: THEME,
    payload: theme,
  }
}


export const fetchTheme = (uid) => dispatch => {

}
