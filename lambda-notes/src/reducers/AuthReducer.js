import {
  USER_AUTHENTICATED,
  USER_UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  CHECK_IF_AUTHENTICATED,
  USER_REGISTERED

} from '../actions';

const initialAuth = {
  userAuthenticated: false,
  userUnauthenticated: false,
  authenticationError: null,
  checkIfAuthenticated: false,
  userRegistered: false
}

export const authenticate = (auth = initialAuth, action) => {
  switch (action.type) {
    case USER_REGISTERED:
      return { ...auth, userRegistered: true };
    case USER_AUTHENTICATED:
      return { ...auth, userAuthenticated: true };
    case USER_UNAUTHENTICATED:
      return { ...auth, userUnauthenticated: true };
    case AUTHENTICATION_ERROR:
      return { 
        ...auth, 
        userAuthenticated: false,
        userUnauthenticated: false,
        checkIfAuthenticated: false,
        userRegistered: false,
        error: action.payload 
      };
    case CHECK_IF_AUTHENTICATED:
      return { ...auth };
    default:
      return auth;
  }
};