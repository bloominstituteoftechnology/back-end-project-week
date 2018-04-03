import { combineReducers } from 'redux';
import AuthReducer from './auth';
import { reducer as FormReducer } from 'redux-form';
import NotesReducer from './notes';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  notes: NotesReducer,
});

export default rootReducer;