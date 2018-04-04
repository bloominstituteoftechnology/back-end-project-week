const { authenticate } = require('../utils/middleware');
const {
  createUser,
  login,
  createNote,
  getAllNotes,
  singleNote,
  updateNote,
  deleteNote,
} = require('../controllers');

module.exports = server => {
  server.route('/api/users').post(createUser);
  server.route('/api/login').post(login);
  server.get('/api/notes/get', authenticate, getAllNotes);
  server.route('/api/notes/get/:id').get(singleNote);
  server.route('/api/notes/create').post(createNote);
  server.route('/api/notes/update').put(updateNote);
  server.route('/api/notes/destroy/:id').delete(deleteNote);
};
