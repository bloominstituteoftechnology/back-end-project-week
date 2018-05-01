import { combineReducers } from 'redux';
import AuthReducer from './auth';
import notesReducer from './notes';

const rootReducer = combineReducers({
  auth: AuthReducer,
  notes: notesReducer,
});

export default rootReducer;