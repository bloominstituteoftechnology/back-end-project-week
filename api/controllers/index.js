const { addNote } = require('./addNote');
const { deleteNote } = require('./deleteNote');
const { editNote } = require('./editNote');
const { getNotes } = require('./getNotes');

const { userCreate } = require('./user');
const { userLogin } = require('./login');
const { userLogout } = require('./login');

module.exports = {
  addNote,
  deleteNote,
  editNote,
  getNotes,
  userCreate,
  userLogin,
  userLogout
};