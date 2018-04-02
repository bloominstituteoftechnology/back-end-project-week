const { authenticate } = require('../utils/middleware');

const { createUser } = require('../controllers');

module.exports = server => {
  server.route('/api/users').post(createUser);
};
