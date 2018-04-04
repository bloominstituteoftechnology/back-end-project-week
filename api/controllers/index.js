const { createUser, login } = require('./userController');

const {
  createNote,
  getAllNotes,
  singleNote,
  updateNote,
  deleteNote,
} = require('./noteController');

module.exports = {
  createUser,
  login,
  createNote,
  getAllNotes,
  singleNote,
  updateNote,
  deleteNote,
};
