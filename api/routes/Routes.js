const { validateToken } = require('../services/auth');
const { createUser, login, getUsers, newNote, deleteNote, getNotes } = require('../controllers');

module.exports = server => {
  server.route('/api/users').post(createUser);
  server.route('/api/login').post(login);
  server.route('/api/get').get(validateToken, getUsers);
  server.route('/api/new-note').post(validateToken, newNote);
  server.route('/api/note/delete/:id').delete(validateToken, deleteNote);
  server.route('/api/notes').get(validateToken, getNotes);
};