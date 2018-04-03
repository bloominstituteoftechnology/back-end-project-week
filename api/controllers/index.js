const { createUser } = require('./user');
const { login } = require('./login');
const { createNote, listNotes } = require('./notes');

module.exports = {
  createUser,
  login,
  createNote,
  listNotes,
};