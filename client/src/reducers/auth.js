import {
  AUTHENTICATION_ERROR,
  USER_UNAUTHENTICATED,
  USER_AUTHENTICATED,
} from '../actions/signUpandIn';

export default (auth = {}, action) => {
  switch (action.type) {
    case AUTHENTICATION_ERROR:
      return { ...auth, error: action.payload };

    case USER_AUTHENTICATED:
      return { ...auth, authenticated: true };

    case USER_UNAUTHENTICATED:
      return { ...auth, authenticated: false };

    default:
      return auth;
  }
};
