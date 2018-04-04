import axios from "axios";

export const GETTING_NOTES = "GETTING_NOTES";
export const NOTES_FETCHED = "NOTES_FETCHED";
export const ERROR_FETCHING_NOTES = "ERROR_FETCHING_NOTES";

export const MAKING_NOTE = "MAKING_NOTE";
export const MAKE_NOTE_SUCCESS = "MAKE_NOTE_SUCCESS";
export const MAKE_NOTE_FAILURE = "MAKE_NOTE_FAILURE";

export const DELETING_NOTE = "DELETING_NOTE";
export const DELETE_NOTE_SUCCESS = "DELETE_NOTE_SUCCESS";
export const DELETE_NOTE_FAILURE = "DELETE_NOTE_FAILURE";

export const UPDATING_NOTE = "UPDATING_NOTE";
export const UPDATE_NOTE_SUCCESS = "UPDATE_NOTE_SUCCESS";
export const UPDATE_NOTE_FAILURE = "UPDATE_NOTE_FAILURE";

const url = " http://localhost:5000";

export const getNotes = () => {
  const auth = {
    headers: { authorization: localStorage.getItem("authorization") }
  };
  const notes = axios.get(`/api/notes`, auth);
  return dispatch => {
    dispatch({ type: FETCHING_NOTES });
    notes
      .then(({ data }) => {
        dispatch({ type: NOTES_FETCHED, payload: data });
      })
      .catch(error => {
        dispatch({ type: ERROR_FETCHING_NOTES, payload: error });
      });
  };
};

export const createNote = values => {
  const auth = {
    headers: { authorization: localStorage.getItem("authorization") }
  };
  return dispatch => {
    dispatch({ type: CREATING_NOTE });
    axios
      .post(`/api/notes`, values, auth)
      .then(({ data }) => {
        dispatch({ type: CREATE_NOTE_SUCCESS, payload: data });
      })
      .catch(error => {
        dispatch({ type: CREATE_NOTE_FAILURE, payload: error });
      });
  };
};

export const deleteNote = id => {
  const auth = {
    headers: { authorization: localStorage.getItem("authorization") }
  };
  return dispatch => {
    dispatch({ type: DELETING_NOTE });
    axios
      .delete(`/api/notes/${id}`)
      .then(({ data }) => {
        return axios.get(`/api/notes`, auth).then(({ data }) => {
          dispatch({ type: DELETE_NOTE_SUCCESS, payload: data });
        });
      })
      .catch(error => {
        dispatch({ type: DELETE_NOTE_FAILURE, payload: error });
      });
  };
};

export const updateNote = (id, newInfo) => {
  const auth = {
    headers: { authorization: localStorage.getItem("authorization") }
  };
  const updatedNote = axios.put(`/api/notes/${id}`, newInfo);
  return dispatch => {
    dispatch({ type: UPDATING_NOTE });
    updatedNote
      .then(({ data }) => {
        return axios.get(`/api/notes`, auth).then(({ data }) => {
          dispatch({ type: UPDATE_NOTE_SUCCESS, payload: data });
        });
      })
      .catch(error => {
        dispatch({ type: UPDATE_NOTE_FAILURE, payload: error });
      });
  };
};
