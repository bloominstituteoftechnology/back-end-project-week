import { combineReducers } from 'redux';
import { notes, modal } from './NotesReducer';
import { authenticate } from './AuthReducer';

export const rootReducer = combineReducers({
  notes,
  modal,
  authenticate
});