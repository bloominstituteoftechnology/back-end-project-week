const { authenticate } = require('../authenticate');

const { register } = require('../controllers/register');
const { login } = require('../controllers/login');
const { newNote } = require('../controllers/newNote');
const { noteList } = require('../controllers/noteList');
const { users } = require('../controllers/users');

module.exports = server => {
  server.route('/api/users').get(users);
  server.route('/api/register').post(register);
  server.route('/api/login').post(login);

  server.route('/api/notes').get(authenticate, noteList);
  server.route('/api/newnote').post(authenticate, newNote);
};
