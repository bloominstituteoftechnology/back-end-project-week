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

module.exports = {
  createUser,
  login,
  displayNotes,
  createNote
};
