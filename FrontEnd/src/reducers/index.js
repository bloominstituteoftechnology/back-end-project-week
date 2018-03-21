import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import noteReducer from './noteReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  note: noteReducer
});

export default rootReducer;