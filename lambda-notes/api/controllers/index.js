const { getNotes, saveNote, deleteNote, editNote } = require('./notes');
const { registerUser } = require('./register');
const { login } = require('./login');

module.exports = {
  getNotes,
  saveNote,
  deleteNote,
  editNote,
  registerUser,
  login
};