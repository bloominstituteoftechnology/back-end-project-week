import { combineReducers } from 'redux';
import NotesReducer from './NotesReducer';
import AuthReducer from './AuthReducer';

const rootReducer = combineReducers({
  notes: NotesReducer,
  auth: AuthReducer
});

export default rootReducer;
