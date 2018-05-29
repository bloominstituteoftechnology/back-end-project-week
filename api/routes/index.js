const { authenticate } = require('../services/auth');

const { createUser } = require('./controllers/userController');
const { login } = require('./loginController');
const { createNote, listNote, editNote, deleteNote } = require('./controllers/notesController');

module.exports = server => {
    server.get('./controllers/notesController', authenticate, listNotes);
    server.route('./controllers/userController').post(createUser);
    server.route('./controllers/loginController').post(login);
    server.route('./controllers/notesController').post(authenticate, createNote);
    server.route('./controllers/notesController').put(authenticate, editNote);
    server.route('./controllers/notesController/:_id').delete(authenticate, deleteNote);
};