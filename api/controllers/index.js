const { userLogin } = require("./userLogin");
const { userRegister } = require("./userRegister");
const { getNotes, getNote, createNote, editNote } = require("./notes");

module.exports = {
  userLogin,
  userRegister,
  getNotes,
  getNote,
  createNote,
  editNote
};
