const { authenticate } = require('../utils/middlewares');
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/user');
//const { login, createUser } = require('../controllers');

module.exports = async server => {
  server.route('/api/login').post( login );
  server.route('/api/createUser').post(createUser);
};
