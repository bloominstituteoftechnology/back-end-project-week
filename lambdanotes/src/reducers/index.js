import { reducer as FormReducer } from 'redux-form';
import { combineReducers } from 'redux';
import {
  USER_AUTHENTICATED,
  USER_UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  CHECK_IF_AUTHENTICATED,
} from '../actions';

const AuthReducer = (auth = {}, action) => {
  switch (action.type) {
    case USER_AUTHENTICATED:
      return { ...auth, authenticated: true };
    case USER_UNAUTHENTICATED:
      return { ...auth, authenticated: false };
    case AUTHENTICATION_ERROR:
      return { ...auth, error: action.payload };
    case CHECK_IF_AUTHENTICATED:
      return { ...auth };
    default:
      return auth;
  }
};

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
});

export default rootReducer;
