import { combineReducers } from 'redux';
import { notes, modal } from './NotesReducer';
import AuthReducer from './AuthReducer';

export const rootReducer = combineReducers({
  notes,
  modal,
  AuthReducer
});