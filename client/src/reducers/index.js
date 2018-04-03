import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth';

const rootReducer = combineReducers({
  form: FormReducer,
  auth: AuthReducer,
});

export default rootReducer;
