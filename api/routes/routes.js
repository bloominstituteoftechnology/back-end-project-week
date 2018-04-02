const { userCreate } = require('../controllers/userCreate');

module.exports = server => {
  // server.get('/api/notes', authenticate, getAllJokes);
  server.route('/api/users').post(userCreate),
  server.route('/api/login'); //.post(login);
};
