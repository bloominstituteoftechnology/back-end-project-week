import { combineReducers } from 'redux';
import AuthReducer from './authentication';
import { reducer as FormReducer } from 'redux-form';
import notesReducer from './notes';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  notes: notesReducer,
});

export default rootReducer;
