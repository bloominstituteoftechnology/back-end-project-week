// const { getAllJokes, createUser, login } = require('../controllers');

module.exports = server => {
  // server.get('/api/notes', authenticate, getAllJokes);
  // server.route('/api/users').post(createUser);
  server.route('/api/login'); //.post(login);
};
