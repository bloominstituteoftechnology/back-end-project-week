const { createUser, login } = require('./user');
const { createNote, getNotes } = require('./note');

module.exports = {
  createUser,
  login,
  createNote,
  getNotes,
}; 