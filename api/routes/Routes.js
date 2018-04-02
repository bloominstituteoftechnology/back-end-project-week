const { validateToken } = require('../services/auth');
const { createUser, login, getUsers } = require('../controllers');

module.exports = server => {
  server.route('/api/users').post(createUser);
  server.route('/api/login').post(login);
  server.route('/api/get').get(validateToken, getUsers);
};