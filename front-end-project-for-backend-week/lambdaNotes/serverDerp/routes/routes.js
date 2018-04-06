const createUser = require('../controllers/createUser');
const addNote = require('../controllers/addNote');
const login = require('../controllers/login');
const getNotes = require('../controllers/getNotes');
const modifyNote = require('../controllers/modifyNote');
const deleteNote = require('../controllers/deleteNote');
const authenticate = require('../controllers/authenticate');


module.exports = server => {
  server.get('/serverDerp/notes', authenticate, getNotes);
  server.route('/serverDerp/notes').post(authenticate, addNote);
  server.route('/serverDerp/notes').put(authenticate, modifyNote);
  server.route('/serverDerp/notes').delete(authenticate, deleteNote);
  server.route('/serverDerp/users').post(createUser);
  server.route('/serverDerp/login').post(login);
};