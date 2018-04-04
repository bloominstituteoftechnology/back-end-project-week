import { ADD_NOTE } from "../actions";
import { DELETE_NOTE } from "../actions";
import { EDIT_NOTE } from "../actions";
import { LOGIN_SUCCESS, LOGIN_FAIL, NOTES_RETRIEVED } from "../actions";

const initialState = {
  notes: [],
  authed: false
};

export default (state = initialState, action) => {
  console.log("Reducer received:", action);
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign(
        {},
        {
          notes: [...state.notes],
          authed: true
        }
      );
    case ADD_NOTE:
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            title: action.payload.title,
            text: action.payload.text,
            id: action.id
          }
        ]
      };

    case DELETE_NOTE:
      console.log("Deleting note ", action.id);
      return Object.assign(
        {},
        {
          notes: state.notes.filter(note => {
            if (note.id !== action.id) return note;
          })
        }
      );

    case EDIT_NOTE:
      return Object.assign(
        {},
        {
          notes: state.notes.map(note => {
            if (note.id === action.id) {
              return {
                title: action.payload.title,
                text: action.payload.text,
                id: action.id
              };
            }
            return note;
          })
        }
      );

    case NOTES_RETRIEVED:
      return {
        ...state,
        notes: action.payload.data.map(note => {
          return {
            title: note.title,
            text: note.body,
            id: note._id,
          }
        })
      };

    default:
      return state;
  }
};
