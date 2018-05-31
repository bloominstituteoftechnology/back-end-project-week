const { createUser } = require('./userController');
const { login } = require('./loginController');
const { createNote, listNote, editNote, deleteNote } = require('./notesController');

module.exports = {
    createUser,
    login,
    createNote,
    listNotes,
    editNote,
    deleteNote,
};