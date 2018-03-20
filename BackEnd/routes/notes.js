const { authenticate, addNote, getNotes, updateNote, deleteNote } = require('../controllers/notes');

module.exports = server => {

    server.post('/notes', authenticate, addNote);
    server.get('/notes', authenticate, getNotes);
    server.put('/notes', authenticate, updateNote);
    server.delete('/notes', authenticate, deleteNote);
};