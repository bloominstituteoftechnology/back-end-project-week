const { createUser, getUsers, login } = require('../controllers');
const { validateToken } = require('../services/auth');
const { createNote, getNotes } = require('../controllers/note');

module.exports = server => {
    server.post('/api/login', login);
    server
        .route('/api/users')
        .post(createUser)
        .get(validateToken, getUsers);
    server
        .route('/api/notes')
        .post(createNote)
        .get(validateToken, getNotes);
};
