const { authenticate } = require('../utils/middleware');
const { createUser, login } = require('../controllers');

module.exports = server => {
  server.route('/api/users').post(createUser);
  server.route('/api/login').post(login);
  // server
  //   .route('/api/notes')
  //   .get()
  //   .post()
  //   .put()
  //   .delete();
};
