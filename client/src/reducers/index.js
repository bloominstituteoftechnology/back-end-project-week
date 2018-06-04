import { ADD_NOTE, UPDATE_NOTE, DELETE_NOTE, MARK_COMPLETE } from "../actions";
import update from "immutability-helper";

const initialState = [];

export default (notes = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      action.note.id = notes.length;
      const addedState = update(notes, { $push: [action.note] });
      return addedState;
    case MARK_COMPLETE:
      const completed = notes[action.index].completed;
      const completedState = update(notes, {
        [action.index]: { completed: { $set: !completed } }
      });
      return completedState;
    case UPDATE_NOTE:
      const updatedNote = action.note;
      const updatedState = update(notes, {
        [action.index]: { $set: updatedNote }
      });
      return updatedState;
    case DELETE_NOTE:
      const deletedState = update(notes, { $splice: [[action.index, 1]] });
      return deletedState;
    default:
      return notes;
  }
};
