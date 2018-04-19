const { createUser, login, getUsers } = require('./user');
const { createNote, getNotes, updateNote, deleteNote } = require('./note');

module.exports = {
  createUser,
  login,
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  getUsers
}; 