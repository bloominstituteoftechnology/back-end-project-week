const { authenticate } = require("../utils/middleware");
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/user');
const {
  createNote,
  getNotes,
  deleteNote,
  editNote
} = require("../controllers/notes");

module.exports = async (server) => {
  server.route("/users").post(createUser);
  server.route("/login").post(login);
  server.get("/uid/displayNotes", authenticate, getNotes);
  server.route("/uid/createNote").post(createNote);
  server.route('/uid/editNote/id').put(editNote);
  server.route('/uid/deleteNote/id').delete(deleteNote);
};
