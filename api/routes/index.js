const { authenticate } = require('../services/auth');

const { createUser, login, createNote } = require('../controllers');

module.exports = server => {
  server.route('/api/users').post(createUser);
  server.route('/api/login').post(login);
  server.route('/api/notes').post(createNote);
};
