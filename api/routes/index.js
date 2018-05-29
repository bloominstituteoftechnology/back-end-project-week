const { authenticate } = require('../services/auth');

const { createUser } = require('./api/controllers/userController');
const { login } = require('./loginController');
const { createNote, listNote, editNote, deleteNote } = require('./api/controllers/notesController');

module.exports = server => {
    server.get('./api/controllers/notesController', authenticate, listNotes);
    server.route('./api/controllers/usersController').post(createUser);
    server.route('./api/controllers/loginController').post(login);
    server.route('./api/controllers/notesController').post(authenticate, createNote);
    server.route('./api/controllers/notesController').put(authenticate, editNote);
    server.route('./api/controllers/notesController/:_id').delete(authenticate, deleteNote);
};