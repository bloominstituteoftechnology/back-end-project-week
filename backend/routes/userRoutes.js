const { createUser, login } = require('../controllers');
const { validateToken } = require('../services/auth');

module.exports = server => {
  console.log(server.method);
  server.route('/api/users/login').post(login);
  server.route('/api/users/signup').post(createUser).get(validateToken);
}