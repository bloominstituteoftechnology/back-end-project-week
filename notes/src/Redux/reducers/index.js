import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';

import {
  AUTHENTICATION_ERROR,
  CLEAR_ERROR,
  USER_CREATE,
  LOGIN,
  LOGOUT,
  SET_ID,
  GET_NOTES,
  EDIT_NOTE,
  DELETE_NOTE,
} from '../actions';

const AuthReducer = (auth = {}, action) => {
  switch (action.type) {
    case AUTHENTICATION_ERROR:
      return { ...auth, message: action.payload };
    case CLEAR_ERROR:
      return { ...auth, message: undefined };
    case USER_CREATE:
      return { ...auth, message: 'Registered' };
    case LOGIN:
      return { ...auth, authenticated: true, user: action.payload };
    case LOGOUT:
      return { ...auth, authenticated: false, user: null };
    case SET_ID:
      return { ...auth, authenticated: true, user: action.payload };
    default:
      return auth;
  }
};

const NoteReducer = (notes = [], action) => {
  switch (action.type) {
    case GET_NOTES:
      return action.payload;
    case EDIT_NOTE:
      return notes.map(each => {
        if (each._id !== action.payload._id) return each;
        return action.payload;
      });
    case DELETE_NOTE:
      return notes.filter(each => {
        return each._id !== action.payload._id;
      });
    default:
      return notes;
  }
};

const rootReducer = combineReducers({
  auth: AuthReducer,
  notes: NoteReducer,
  form: FormReducer,
});

export default rootReducer;
