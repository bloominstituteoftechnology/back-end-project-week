const createUser = require('./user');
const login = require('./login');
const { addNote, getAllNotes, editNote, deleteNote } = require('./notes');

module.exports = {
   createUser,
   login,
   addNote,
   getAllNotes,
   editNote,
   deleteNote,
};