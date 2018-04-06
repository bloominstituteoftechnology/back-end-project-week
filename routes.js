const { createUser, userLogin } = require('./Controllers/userController');
const { getAllNotes, createNote, getNoteById, updateNote, deleteNote } = require('./Controllers/noteController');
const { authenticateUser } = require('./middlewares');

module.exports = server => {
  server.route('/new-user').post(createUser);
  server.route('/login').post(userLogin);
  server.route('/', authenticateUser).get(getAllNotes);
  server.route('/', authenticateUser).post(createNote);
};
