const { createUser } = require('./user');
const { login } = require('./login');
const { createNote, listNotes, editNote } = require('./notes');

module.exports = {
  createUser,
  login,
  createNote,
  listNotes,
  editNote,
};