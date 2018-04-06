import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './auth';
import NoteReducer from './note';

const rootReducer = combineReducers({
  form: formReducer,
  auth: AuthReducer,
  notes: NoteReducer,
});

export default rootReducer;
