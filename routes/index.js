const { createUser, getUsers, login } = require('../controllers');
const { validateToken } = require('../services/auth');

module.exports = server => {
  server.post('/api/login', login);
  server
    .route('/api/users')
    .post(createUser)
    .get(validateToken, getUsers);
};