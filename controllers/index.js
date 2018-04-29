const { createUser } = require('./user');
const { login } = require('./login');
const { getAllNotes } = require('./notes');
const { createNote, getNotes, deleteNote, editNote } = require('../controllers/notes');

module.exports = {
    login,
    createUser,
    createNote,
    getNotes,
    deleteNote,
    editNote
};