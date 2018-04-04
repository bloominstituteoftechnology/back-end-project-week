import {
  USER_AUTHENTICATED,
  USER_UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  CHECK_IF_AUTHENTICATED
} from '../actions';

const initialState = {
  authenticated: false
};

export default (auth = initialState, action) => {
  switch(action.type) {
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
