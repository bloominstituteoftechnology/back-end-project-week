const { addCollab } = require('./addCollab');
const { getNotes } = require('./getNotes');
const { addNote } = require('./addNote');
const { editNote } = require('./editNote');
const { deleteNote } = require('./deleteNote');
const { userCreate } = require('./userCreate');
const { userLogin } = require('./userLogin');
const { userLogout } = require('./userLogout');

module.exports = {
  addCollab,
  getNotes,
  addNote,
  editNote,
  deleteNote,
  userCreate,
  userLogin,
  userLogout,
};