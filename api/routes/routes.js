const { authenticate } = require('../utils/middlewares');

const { login, createUser } = require('../controllers');

module.exports = server => {
  server.get('/api/login');
  server.get('/api/createUser');
};
