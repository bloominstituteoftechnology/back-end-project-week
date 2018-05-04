const { authenticate } = require("../utils/middleware");
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/user');
const {
  createNote,
  getNotes,
  deleteNote,
  editNote
} = require("../controllers/notes");

module.exports = (server) => {
  server.route("/").post(createUser);
  server.route("/login").post(login);
  server.route('/:uid/displayNotes',authenticate).get(getNotes);
  server.route("/:uid/createNote", authenticate).post(createNote);
  server.route('/editNote/:id', authenticate).put(editNote);
  server.route('deleteNote/:id', authenticate).delete(deleteNote);
};
