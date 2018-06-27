import axios from "axios";
import ReduxThunk from 'redux-thunk';

export const FETCHING_NOTES = "FETCHING_NOTES";
export const FETCHED_NOTES = "FETCHED_NOTES";
export const ERROR_FETCHING_NOTES = "ERROR_FETCHING_NOTES";
export const CREATING_NOTE = "CREATING_NOTE";
export const CREATED_NOTE = "CREATED_NOTE";
export const EDITING_NOTE = "EDITING_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const ORDER_NOTE = "ORDER_NOTE";

export const fetchNotes = (userId) => {
  const user = axios.get(`http://localhost:5000/users/${userId}`);
  return dispatch => {
    dispatch({ type: FETCHING_NOTES });
    user.then(response => {
        dispatch({ type: FETCHED_NOTES, payload: response.data });
      })
      .catch(response => {
        dispatch({ type: ERROR_FETCHING_NOTES, payload: response.data });
      });
  };

};




export const editNote = note => {
  
}

export const orderNote = note => {
  
}

export const deleteNote = id => {
  
};
