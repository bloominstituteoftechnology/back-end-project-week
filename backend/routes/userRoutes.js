const { createUser, login } = require('../controllers');
const { validateToken } = require('../services/auth');

module.exports = server => {
  server.post('/login', login);
  server.post('/signup', createUser).get(validateToken);
}