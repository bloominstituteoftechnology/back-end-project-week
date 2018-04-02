const { createNote, getNotes, login } = require('../controllers/note');
const { validateToken } = require('../services/auth');

module.exports = server => {
  server.post('/api/login', login);
  server
    .route('/api/notes')
    .post(createNote)
    .get(validateToken, getNotes);
};