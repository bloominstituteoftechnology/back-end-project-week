const {
    comparePassword,
    authenticate,
    encryptPassword
} = require('../controls/authC');
const { login } = require('../controls/login');
const { signup } = require('../controls/signup');
const {
    getNotes,
    addNote,
    updateNote,
    deleteNote
} = require('../controls/notes');

module.exports = server => {
    server.post('/login', comparePassword, login);
    server.post('/signup', encryptPassword, signup, login);
    server.post('/notes', authenticate, addNote);
    server.get('/notes', authenticate, getNotes);
    server.put('/notes', authenticate, updateNote);
    server.delete('/notes', authenticate, deleteNote);
};
