import {
    USER_AUTH,
    USER_UNAUTH,
    AUTH_ERR,
    CHECK_IF_AUTH
} from '../actions';
  
  export default (auth = {}, action) => {
    switch (action.type) {
      case USER_AUTH:
        return { ...auth, authenticated: true };
      case USER_UNAUTH:
        return { ...auth, authenticated: false };
      case AUTH_ERR:
        return { ...auth, error: action.payload };
      case CHECK_IF_AUTH:
        return { ...auth };
      default:
        return auth;
    }
  };