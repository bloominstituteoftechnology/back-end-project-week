import { combineReducers } from 'redux';
import { notes, modal } from './NotesReducer';

export const rootReducer = combineReducers({
  notes,
  modal
})