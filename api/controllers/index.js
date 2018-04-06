const createUser = require('./user');
const login = require('./login');
const { addNote, getAllNotes } = require('./notes');

module.exports = {
   createUser,
   login,
   addNote,
   getAllNotes,
};