const { createUser, login, createNote, getNotes, updateNote, deleteNote } = require('../controllers');
const { validateToken } = require('../services/auth');

module.exports = server => {
    server
        .route('/api/users')
        .post(createUser)
        // .get(validateToken, getUsers);
    server.post('/api/login', login);
    server.route('/api/notes').post(createNote);
        // .get(validateToken, getNotesByUserId);
    server.route('/api/users/:id').get(validateToken, getNotes);
    server.route('/api/notes/:authorId/:noteId').put(validateToken, updateNote);
    server.delete('/api/notes/:noteId', validateToken, deleteNote);
};
