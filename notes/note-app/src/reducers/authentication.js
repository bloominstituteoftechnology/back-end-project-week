import {
  //
  AUTH_LOGIN_START,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_FINISH,
  //
  AUTH_SIGNUP_START,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_ERROR,
  AUTH_SIGNUP_FINISH,
  //
  AUTH_NOTES_ERROR,
  //
  // AUTH_USER_AUTHENTICATED,
  // AUTH_USER_UNAUTHENTICATED,
  // AUTH_ERROR,
  // AUTH_CHECK,
  AUTH_LOGOUT_SUCCESS,
  AUTH_ERROR_RESET,
} from '../actions';

const initialState = {
  // authenticated: false,
  user: '',
  authenticating: false,
  error: '',
};

export default (auth = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGNUP_START:
      return {
        ...auth,
        authenticating: true,
      };

    case AUTH_SIGNUP_SUCCESS:
      return {
        ...auth,
        // authenticating: false,
      };

    case AUTH_SIGNUP_ERROR:
      return {
        ...auth,
        error: action.payload,
      };

    case AUTH_SIGNUP_FINISH:
      return {
        ...auth,
        authenticating: false,
      };

    //

    case AUTH_LOGIN_START:
      return {
        ...auth,
        authenticating: true,
      };

    case AUTH_LOGIN_SUCCESS:
      return {
        ...auth,
        user: action.payload,
        // authenticated: true,
      };

    case AUTH_LOGIN_ERROR:
      return {
        ...auth,
        error: action.payload,
      };

    case AUTH_LOGIN_FINISH:
      return {
        ...auth,
        authenticating: false,
      };

    //
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...auth,
        user: '',
      };

    case AUTH_NOTES_ERROR:
      return {
        ...auth,
        error: action.payload,
      };

    // case AUTH_USER_UNAUTHENTICATED:
    //   return {
    //     ...auth,
    //     authenticated: false,
    //   };

    case AUTH_ERROR_RESET:
      return {
        ...auth,
        error: '',
      };

    default:
      return auth;
  }
};
