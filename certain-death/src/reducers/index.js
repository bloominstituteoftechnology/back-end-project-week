/* eslint no-underscore-dangle: [0] */

import {
  ADDING_NOTE,
  ADDED_NOTE,
  DELETING_NOTE,
  DELETED_NOTE,
  ERROR,
  GETTING_NOTES,
  GOT_NOTES,
  LOGGED_IN,
  LOGGING_IN,
  NEWEST_SORT,
  OLDEST_SORT,
  SHOW_NOTES,
  SIGNING_UP,
  TITLE_SORT,
  TOGGLE_DELETE,
  UPDATING_NOTE,
  UPDATED_NOTE,
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
  gettingNotes: false,
  updatingNote: false,
  deletingNote: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADDING_NOTE:
      return {
        ...state,
        addingNote: true,
      };
    case ADDED_NOTE:
      return {
        ...state,
        addingNote: false,
      };
    case DELETED_NOTE:
      return {
        ...state,
        deletingNote: false,
        notes: state.notes.filter(val => val._id !== action.payload.data._id),
      };
    case DELETING_NOTE:
      return {
        ...state,
        deletingNote: true,
      };
    case ERROR:
      return {
        ...state
      };
    case GETTING_NOTES:
      return {
        ...state,
        gettingNotes: true,
      };
    case GOT_NOTES:
      return {
        ...state,
        notes: action.payload,
        sortStatus: 'Unsorted',
        gettingNotes: false,
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
    case UPDATING_NOTE:
      return {
        ...state,
        updatingNote: true,
      };
    case UPDATED_NOTE:
      return {
        ...state,
        notes: [...state.notes].map((val) => {
          if (val._id !== action.payload.data._id) {
            return val;
          } return action.payload.data;
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
