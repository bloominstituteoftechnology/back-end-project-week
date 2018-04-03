import { AUTHENTICATION_ERROR } from '../actions/signUpandIn';

export default (auth = {}, action) => {
  switch (action.type) {
    case AUTHENTICATION_ERROR:
      return { ...auth, error: action.payload };

    default:
      return auth;
  }
};
