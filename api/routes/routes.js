const createUser = require('../controllers/createUser');
const addNote = require('../controllers/addNote');
const login = require('../controllers/login');
const getNotes = require('../controllers/getNotes');
const modifyNote = require('../controllers/modifyNote');
const deleteNote = require('../controllers/deleteNote');


module.exports = server => {
  server.route('/api/users').post(createUser);
  server.route('/api/notes').post(addNote);
  server.route('/api/notes').put(modifyNote);
  server.route('/api/notes').delete(deleteNote);
  server.route('/api/login').post(login);
  server.route('/api/getNotes').post(getNotes);
};
