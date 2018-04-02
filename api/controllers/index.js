const { createUser } = require('./User');
const { login } = require('./Login');
const { getUsers } = require('./GetUsers');

module.exports = {
  createUser,
  login,
  getUsers
};