import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './auth';
import noteReducer from './note';

const rootReducer = combineReducers({
  form: formReducer,
  auth: AuthReducer,
  note: noteReducer,
});

export default rootReducer;
