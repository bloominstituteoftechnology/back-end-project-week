const { authenticate } = require('../utils/middlewares');

const { getNotes,
  saveNote,
  deleteNote,
  editNote,
  registerUser,
  login } = require('../controllers');

  module.exports = server => {
    server.route('/api/notes')
    .get(authenticate, getNotes)
    .post(authenticate, saveNote);
    server.route('/api/notes/:id')
    .put(editNote)
    .delete(deleteNote);
    server.route('/api/users').post(registerUser);
    server.route('/api/login').post(login);
  }