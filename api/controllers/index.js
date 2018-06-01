const { userLogin } = require("./userLogin");
const { userRegister } = require("./userRegister");
const { getNotes, createNote } = require("./notes");

module.exports = {
  userLogin,
  userRegister,
  getNotes,
  createNote
};
