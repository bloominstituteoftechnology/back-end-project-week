const { authenticate } = require('../utils/middlewares');
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/user');
//const { login, createUser } = require('../controllers');
const { displayNotes } = require('../controllers/displayNote');
const { createNote } = require('../controllers/createNote');
const { deleteNote } = require('../controllers/deleteNote');
const { editNote } = require('../controllers/editNote');

module.exports = server => {
  server.route('/api/login').post(login);
  server.route('/api/createUser').post(createUser);

  server.route('/:username/createNote', authenticate).post(createNote);
  server.route('/:username/editNote/:id', authenticate).put(editNote);
  server.route('/:username/deleteNote/:title', authenticate).delete(deleteNote);
  server.route('/:username/displayNotes', authenticate).get(displayNotes);
};
