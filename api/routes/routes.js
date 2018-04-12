const { createUser, login, getAllNotes, addNote, editNote } = require('../controllers');
const authenticate = require('../utils/middleware');

module.exports = server => {
   server.route('/signup').post(createUser);
   server.route('/login').post(login);
   server.route('/home').post(authenticate, getAllNotes);
   server.route('/create').post(authenticate, addNote);
   // server.route('/edit').post(authenticate, editNote);
}