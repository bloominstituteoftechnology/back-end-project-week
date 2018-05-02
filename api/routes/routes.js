const { authenticate } = require('../utils/middlewares');
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/user');
//const { login, createUser } = require('../controllers');
const { displayNotes } = require('../controllers/displayNote');

module.exports = server => {
  server.route('/api/login').post(login);
  server.route('/api/createUser').post(createUser);

  //server.route('/:userID/createNote').post(createNote);
  //server.route('/api/editNote').put(editNote);
  //server.route('/api/deleteNote').delete(deleteNote);
  server.route('/userID/displayNotes', authenticate).get(displayNotes);
};
