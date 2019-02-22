import axios from "axios";
export const FETCHING = "FETCHING";
export const GET_NOTE = "GET_NOTE";
export const GET_NOTES = "GET_NOTES";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const CREATE_NOTE = "CREATE_NOTE";
export const LOADING = "LOADING";
export const ERROR = "ERROR";
export const DELETE = "DELETE";

export const getNotes = () => {
  return dispatch => {
    dispatch({ type: LOADING });
    axios
      .get("http://localhost:5000/")
      .then(response => {
        dispatch({ type: GET_NOTES, notes: response.data });
      })
      .catch(err => {
        dispatch({ type: ERROR, errorMessage: "error retrieving notes" });
      });
  };
};

export const createNote = note => {
  return dispatch => {
    dispatch({ type: CREATE_NOTE, note });
    axios
      .post("http://localhost:5000/create", note)
      .then(response => {
        dispatch({ type: CREATE_NOTE, notes: response.data });
      })
      .catch(err => {
        dispatch({ type: ERROR, errorMessage: "Unable to create notes" });
      });
  };
};

export const updateNote = (updatedNote) => {
  return (dispatch) => {
    dispatch({type: LOADING})
    axios.put(`http://localhost:5000/edit/${updatedNote.id}`, updatedNote)
      .then( response => {
        dispatch({ type: UPDATE_NOTE, notes: response.data})
      })
      .catch( err => {
        dispatch({type: ERROR, errorMessage: "unable to update note"})
      } )
  };
};

export const getNote = (id) => {
  return (dispatch) => {
    dispatch({type: LOADING})
    axios.get(`http://localhost:5000/note/${id}`)
      .then( response => {
        dispatch({ type: GET_NOTE, notes: response.data})
      })
      .catch( err => {
        dispatch({type: ERROR, errorMessage: "unable to get note"})
      } )
  };
};

export const deleteNote = (id) => {
  return (dispatch) => {
    dispatch({type: DELETE})
    axios.delete(`http://localhost:5000/delete/${id}`)
      .then( response => {
        dispatch({ type: DELETE, notes: response.data })
      })
      .catch( err => {
        dispatch({type: ERROR, errorMessage: "Unable to delete notes"})
      })

  }
}

