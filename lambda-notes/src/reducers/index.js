//UI
import { ADD_NOTE, DELETE_NOTE, EDIT_NOTE } from '../actions';

//Authentication
import { USER_AUTHENTICATED, USER_UNAUTHENTICATED, AUTHENTICATION_ERROR, CHECK_IF_AUTHENTICATED, GET_USERS, GET_NOTES } from '../actions';

const initialState = {
  notes: [],
  users: [],
  authenticated: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    //Authentication
    case USER_AUTHENTICATED:
      return { 
        ...state, 
        authenticated: true 
      };
    case USER_UNAUTHENTICATED:
      return { 
        ...state, 
        authenticated: false 
      };
    case AUTHENTICATION_ERROR:
      return { 
        ...state, 
        error: action.payload 
      };
    case CHECK_IF_AUTHENTICATED:
      return { 
        ...state 
      };
    //UI
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
      }
    case GET_USERS:
      return action.payload;
    case ADD_NOTE:
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            title: action.payload.title,
            body: action.payload.body,
            id: action.payload._id
          },
        ],
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => {
          return note.id !== action.payload._id;
        }),
      };
      case EDIT_NOTE:
      return {
        ...state,
        notes: state.notes.map(note => {
          if (note.id !== action.payload.id) return note;
          return action.payload;
        })
      };
    default:
      return state;
  }
};

export default reducer;