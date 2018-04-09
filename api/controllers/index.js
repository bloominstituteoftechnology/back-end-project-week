const { login } = require('./login');
const { createUser } = require('./user');
const { createNote, getNotes, updateNote, deleteNote, viewNote } = require('./note');

module.exports = {
  login,
  createUser,
  createNote,
  updateNote,
  deleteNote,
  getNotes,
  viewNote
};
