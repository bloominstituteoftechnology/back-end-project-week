const { createUser, login } = require('../controllers');
const { authenticate } = require('../utils/middleware');

module.exports = server => {
   server.route('/signup').post(createUser);
   server.route('/login').post(login);
}