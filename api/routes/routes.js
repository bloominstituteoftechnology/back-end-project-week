const { authenticate } = require('../utils/middlewares');

const {
  createUser,
  login,
  createNote,
  updateNote,
  deleteNote,
  getNotes,
  viewNote
} = require('../controllers');

module.exports = server => {
  // server.get('/api/jokes', authenticate, getAllJokes);
  server.route('/api/users').post(createUser);
  server.route('/api/login').post(login);
  server.post('/api/notes', authenticate, createNote);
  server.get('/api/notes', authenticate, getNotes);
  server.get('/api/notes/:id', authenticate, viewNote);
  server.put('/api/notes/:id', authenticate, updateNote);
  server.delete('/api/notes/:id', authenticate, deleteNote);
};
