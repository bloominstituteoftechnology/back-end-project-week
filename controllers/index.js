const { createUser } = require('./user');
const { login } = require('./login');
const { createNote, getNotes, deleteNote, editNote } = require('./notes');

module.exports = {
    login,
    createUser,
    createNote,
    getNotes,
    deleteNote,
    editNote
};