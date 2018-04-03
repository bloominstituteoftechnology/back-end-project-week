const { createUser } = require('./user');
const { login } = require('./login');
const { createNote } = require('./notes');

module.exports = {
  createUser,
  login,
  createNote,
};