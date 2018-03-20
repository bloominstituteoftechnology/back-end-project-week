import {
  AUTH_USER_AUTHENTICATED,
  AUTH_USER_UNAUTHENTICATED,
  AUTH_ERROR,
  AUTH_CHECK,
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
} from '../actions';

const initialState = {
  authenticated: false,
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

    case AUTH_SIGNUP_SUCCESS:
      return {
        ...auth,
        // authenticating: false,
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
        authenticated: true,
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

    case AUTH_USER_UNAUTHENTICATED:
      return {
        ...auth,
        authenticated: false,
      };

    default:
      return auth;
  }
};
