const { authenticate } = require('../services/auth');

const { createUser } = require('../controllers');

module.exports = server => {
  server.route('/api/users').post(createUser);
};
