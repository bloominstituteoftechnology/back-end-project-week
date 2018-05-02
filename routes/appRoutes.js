const ctrlLogin = require('../controllers/loginController');
const ctrlUser = require('../controllers/userController');
const ctrlNotes = require('../controllers/noteController');

module.exports = server => {
    server.get('/login,', ctrlLogin.login);
    server.route('/').post(ctrlUser.userRegistration);
    server.route('/:id').put(ctrlUser.updateUser);
    server.route('/:id').delete(ctrlUser.deleteUser);
    server.get('/users', ctrlUser.getUsers)
    server.get('/:id/notes', ctrlNotes.noteList);
    server.route('/:id/notes').post(ctrlNotes.createNote);
    server.route('/:id/notes/:id').put(ctrlNotes.updateNote);
    server.route('/:id/notes/:id').delete(ctrlNotes.deleteNote);
}