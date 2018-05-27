//get login
//create user
// display notes
// delete notes
// create notes
// update notes

const { createUser } = require('./user');
const { login } = require('./login');
const { displayNotes } = require('./displayNote');
const { createNote } = require('./createNote');
const { deleteNote } = require('./deleteNote');
const { editNote } = require('./editNote');

module.exports = {
  createUser,
  login,
  displayNotes,
  createNote,
  deleteNote,
  editNote
};
