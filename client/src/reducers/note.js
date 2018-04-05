import { ADD_NOTE, VIEW_NOTE, EDIT_NOTE, DELETE_NOTE } from '../actions';

export const NoteReducer = (notes = [], action) => {
  switch (action.type) {
    case ADD_NOTE:
      return { ...notes };

    case VIEW_NOTE:
      return { ...notes, current: action.payload };

    case EDIT_NOTE:
      return {
        ...notes,
        notes: [...notes.notes].map(note => {
          if (note._id !== action.payload.data._id) {
            return note;
          }
          return action.payload.data;
        }),
      };

    case DELETE_NOTE:
      return {
        ...notes,
        notes: notes.notes.filter(note => note._id !== action.payload.data._id),
      };

    default:
      return notes;
  }
};

export default NoteReducer;
