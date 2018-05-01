const { login, userRegistration, updateUser, deleteUser } = require('../controllers');
const { retrieveNotes, createNote, updateNote, deleteNote } = require('../controllers');

module.exports = server => {
    server.route('/login').get(login);
    server.route('/').post(userRegistration);
    server.route('/:id').put(updateUser);
    server.route('/:id').delete(deleteUser);
    server.route('/:id/notes').get(retrieveNotes);
    server.route('/:id/notes').post(createNote);
    server.route('/:id/notes/:id').put(updateNote);
    server.route('/:id/notes/:id').delete(deleteNote);
}