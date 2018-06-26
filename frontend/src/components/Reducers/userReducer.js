import {
  LOGIN,
  LOGOUT,
  ERROR,
  THEME,
} from '../Actions';

const initialState = {
  user: null,
  error: null,
  theme: "default",
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: {
          uid: action.payload,
        }
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        theme: "default"
      }
    case THEME:
      return {
        ...state,
        theme: action.payload,
      }
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}