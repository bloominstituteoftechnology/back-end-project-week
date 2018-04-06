import {
  USER_AUTHENTICATED,
  USER_UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  CHECK_IF_AUTHENTICATED
} from '../actions';

const initialState = {
  authenticated: null,
};

export default (auth = initialState, action) => {
  switch(action.type) {
    case USER_AUTHENTICATED:
      console.log('user authenticated')
      return { ...auth, authenticated: true };
    case USER_UNAUTHENTICATED:
      console.log('user unauthenticated')
      return { ...auth, authenticated: false };
    case AUTHENTICATION_ERROR:
      return { ...auth, error: action.payload };
    case CHECK_IF_AUTHENTICATED:
      return { ...auth };
    default:
      return auth;
  }
};
