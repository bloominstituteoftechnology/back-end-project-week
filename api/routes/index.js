const { authenticate } = require('../services/auth');

const { createUser, login, createNote, listNotes, editNote, deleteNote } = require('../controllers');

module.exports = server => {
  server.get('/api/notes', authenticate, listNotes);
  server.route('/api/users').post(createUser);
  server.route('/api/login').post(login);
  server.route('/api/notes').post(authenticate, createNote);
  server.route('/api/notes').put(authenticate, editNote);
  server.route('/api/notes/:_id').delete(authenticate, deleteNote);
};
