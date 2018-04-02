const { createUser } = require('./User');
const { login } = require('./Login');
const { getUsers } = require('./GetUsers');
const { newNote } = require('./NewNote');

module.exports = {
  createUser,
  login,
  getUsers,
  newNote,
};