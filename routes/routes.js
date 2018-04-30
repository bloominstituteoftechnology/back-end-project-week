const { login, register } = require('../controllers');

module.exports = function(server) {
  server.route('/register').post(register);
  server.route('/login').post(login);
};
