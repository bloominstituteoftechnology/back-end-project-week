import { combineReducers } from 'redux';
import { notes, modal } from './NotesReducer';
import { auth } from './AuthReducer';

export const rootReducer = combineReducers({
  notes,
  modal,
  auth
});