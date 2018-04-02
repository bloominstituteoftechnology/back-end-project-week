const { getNotes, deleteNote, createNote, editNote } = require('./notes');
const { login } = require('./login');
const { createUser } = require('./user');

module.exports = {
  getNotes,
  deleteNote,
  createNote,
  editNote,
  login,
  createUser
};