const { authenticate, addNote, getNotes, updateNote, deleteNote } = require('../controllers/notes');

module.exports = notes => {
    notes.post('/notes', authenticate, addNote);
    notes.get('/notes', authenticate, getNotes);
    notes.put('/notes', authenticate, updateNote);
    notes.delete('/notes', authenticate, deleteNote);
};