const { createUser, login, createNote, getNotes } = require('../controllers');
const { validateToken } = require('../services/auth');

module.exports = server => {
    server
        .route('/api/users')
        .post(createUser)
        // .get(validateToken, getUsers);
    server.post('/api/login', login);
    server
        .route('/api/notes')
        .post(createNote)
        // .get(validateToken, getNotesByUserId);
    server.route('/api/users/:id').get(validateToken, getNotes);
    // server.put('/api/notes', validateToken, getNotes);
    // server.delete('/api/notes', validateToken, getNotes);
};
