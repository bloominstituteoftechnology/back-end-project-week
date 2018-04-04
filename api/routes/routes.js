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
  server.get('/api/notes/get', authenticate, getAllNotes); // tested
  server.route('/api/notes/get/:id').get(authenticate, singleNote); // tested
  server.route('/api/notes/create').post(authenticate, createNote); // tested
  server.route('/api/notes/update').put(authenticate, updateNote); // tested
  server.route('/api/notes/destroy/:id').delete(authenticate, deleteNote); // tested
};
