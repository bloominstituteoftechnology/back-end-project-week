import {
  AUTH_USER_AUTHENTICATED,
  AUTH_USER_UNAUTHENTICATED,
  AUTH_ERROR,
  AUTH_CHECK,
} from '../actions';

export default (auth = { authenticated: false }, action) => {
  switch (action.type) {
    case AUTH_USER_AUTHENTICATED:
      return {
        ...auth,
        authenticated: true,
      };
    case AUTH_USER_UNAUTHENTICATED:
      return {
        ...auth,
        authenticated: false,
      };

    default:
      return auth;
  }
};
