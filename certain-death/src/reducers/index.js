import {
  ADDING_NOTE,
  ADDED_NOTE,
  DELETE_NOTE,
  ERROR,
  LOGGED_IN,
  LOGGING_IN,
  NEWEST_SORT,
  OLDEST_SORT,
  SHOW_NOTES,
  SIGNING_UP,
  TITLE_SORT,
  TOGGLE_DELETE,
  UPDATE_NOTE,
  UPDATE_SEARCH,
  USER_CREATED,
} from '../actions';
import dummyData from '../dummydata';

const initialState = {
  notes: [...dummyData],
  deleteActive: false,
  sortStatus: 'Unsorted',
  input: '',
  signingUp: false,
  loggingIn: false,
  loggedIn: false,
  addingNote: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADDING_NOTE:
      return {
        ...state,
        // sortStatus: 'Unsorted',
        // notes: [...state.notes, {
        //   id: action.id,
        //   title: action.title,
        //   body: action.body,
        //   created: action.created,
        //   stamp: action.stamp,
        // }
        // ],
        addingNote: true,
      };
    case ADDED_NOTE:
      return {
        ...state,
        addingNote: false,
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(val => val.id.toString() !== action.id),
      };
    case ERROR:
      return {
        ...state
      };
    case LOGGED_IN:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
      };
    case LOGGING_IN:
      return {
        ...state,
        loggingIn: true,
      };
    case NEWEST_SORT:
      return {
        ...state,
        sortStatus: 'Most Recent',
        notes: [...state.notes].sort((a, b) => {
          return a.created < b.created;
        }),
      };
    case OLDEST_SORT:
      return {
        ...state,
        sortStatus: 'Oldest',
        notes: [...state.notes].sort((a, b) => {
          return a.created > b.created;
        }),
      };
    case SHOW_NOTES:
      return {
        ...state,
        input: '',
        notes: [...state.notes].map((val) => {
          return { ...val, filtered: false };
        }),
      };
    case SIGNING_UP:
      return {
        ...state,
        signingUp: true,
      };
    case TITLE_SORT:
      return {
        ...state,
        sortStatus: 'A - Z',
        notes: [...state.notes].sort((a, b) => {
          return a.title > b.title;
        }),
      };
    case TOGGLE_DELETE:
      return {
        ...state,
        deleteActive: !state.deleteActive,
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((val) => {
          if (val.id.toString() === action.id) {
            return {
              id: Number(action.id),
              title: action.title,
              body: action.body,
              created: val.created,
              stamp: val.stamp,
            };
          } return val;
        }),
      };
    case UPDATE_SEARCH:
      return {
        ...state,
        input: action.input,
        notes: [...state.notes].map((val) => {
          if (!val.title.includes(state.input) && !val.body.includes(state.input)) {
            return { ...val, filtered: true };
          } return { ...val, filtered: false };
        }),
      };
    case USER_CREATED:
      return {
        ...state,
        signingUp: false,
      };
    default:
      return state;
  }
};
