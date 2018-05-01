const { login } = require('../controllers/login');
const { createUser } = require('../controllers/createUser');

module.exports = server => {
  server.route('/register').post(createUser);
  server.route('/login').post(login);
};
