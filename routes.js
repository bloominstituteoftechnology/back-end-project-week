const { createUser, userLogin, userLogout } = require('./Controllers/userController');
const { getAllNotes, createNote, getNoteById, updateNote, deleteNote } = require('./Controllers/noteController');
const { authenticateUser } = require('./middlewares');

module.exports = server => {
  server.route('/new-user').post(createUser);
  server.route('/login').post(userLogin);
  server.route('/logout').post(userLogout);
  server.route('/', authenticateUser).get(getAllNotes);
  server.route('/', authenticateUser).post(createNote);
  server.route('/delete/:id', authenticateUser).delete(deleteNote);
  server.route('/update/:id', authenticateUser).put(updateNote);
};
