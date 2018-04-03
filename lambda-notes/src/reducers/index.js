//UI
import { ADD_NOTE, DELETE_NOTE, EDIT_NOTE } from '../actions';

//Authentication
import { USER_AUTHENTICATED, USER_UNAUTHENTICATED, AUTHENTICATION_ERROR, CHECK_IF_AUTHENTICATED } from '../actions';

const initialState = {
  notes: [
    {
      id: 0,
      title: 'I Am The Title',
      body: "I Am The Body",
    },  
  ],
  counter: 1,
  authenticated: null,
};

export const reducer = (state = initialState, action) => {
  console.log('state.authenticated', state.authenticated);
  console.log('state.notes', state.notes)
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
    case ADD_NOTE:
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            title: action.payload.title,
            body: action.payload.body,
            id: state.counter,
          },
        ],
        counter: ++state.counter,
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => {
          return note.id !== action.payload;
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