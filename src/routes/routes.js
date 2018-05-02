const { authenticate } = require('../authenticate');

const { register } = require('../controllers/register');
const { login } = require('../controllers/login');

module.exports = server => {
  //server.get(/api/users) or lambdanotes
  server.route('/api/register').post(register);
  server.route('/api/login').post(login);
};
