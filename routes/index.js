const { createUser, login, createNote, getNotes, updateNote, deleteNote, getUsers } = require('../controllers');
const { validateToken } = require('../services/auth');

module.exports = server => {
    server.route('/api/users').post(createUser);
    server.route('/api/login').post(login);
    server.route('/api/notes').post(validateToken, createNote);
    server.route('/api/users/:id').get(validateToken, getNotes);
    server.route('/api/notes/:authorId/:noteId').put(validateToken, updateNote);
    server.route('/api/notes/:authorId/:noteId').delete(validateToken, deleteNote);
    server.route('/api/users').get(validateToken, getUsers);
};
