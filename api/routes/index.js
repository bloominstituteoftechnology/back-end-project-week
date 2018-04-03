const { authenticate } = require('../services/auth');

const { createUser, login } = require('../controllers');

module.exports = server => {
  server.route('/api/users').post(createUser);
  server.route('/api/login').post(login);
};
