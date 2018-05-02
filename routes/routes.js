const { login } = require('../controllers/login');
const { createUser } = require('../controllers/createUser');
const { getNotes } = require('../controllers/notes');
const { createNote } = require('../controllers/notes');
const { editNote } = require('../controllers/notes');
const { deleteNote } = require('../controllers/notes');
const authenticate = require('../middleware/authMiddleware');

module.exports = server => {
  server.route('/register').post(createUser);
  server.route('/login').post(login);
  server.route('/home').post(authenticate, getNotes);
  server.route('/create').post(authenticate, createNote);
  server.route('/edit/:id').put(authenticate, editNote);
  server.route('/note/:id').delete(authenticate, deleteNote);
};
