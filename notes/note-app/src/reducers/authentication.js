import { AUTH_USER_AUTHENTICATED, AUTH_USER_UNAUTHENTICATED } from '../actions';

export default (auth = { authenticated: false }, action) => {
  switch (action.type) {
    case AUTH_USER_AUTHENTICATED:
      return {
        ...auth,
        authenticated: true,
      };

    default:
      return auth;
  }
};
