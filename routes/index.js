const { createUser, login, createNote, getNotes, updateNote, deleteNote } = require('../controllers');
const { validateToken } = require('../services/auth');

module.exports = server => {
    server.route('/api/users').post(createUser)
    server.route('/api/login').post(login);
    server.route('/api/notes').post(createNote);
    server.route('/api/users/:id').get(validateToken, getNotes);
    server.route('/api/notes/:authorId/:noteId').put(validateToken, updateNote);
    server.delete('/api/notes/:noteId', validateToken, deleteNote);
};
