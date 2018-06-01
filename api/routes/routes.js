const { authenticate } = require("../utils/middlewares");

const {
  userRegister,
  userLogin,
  getNotes,
  getNote,
  createNote
} = require("../controllers");

module.exports = server => {
  server.route("/api/register").post(userRegister);
  server.route("/api/login").post(userLogin);
  server.route("/api/notes").get(authenticate, getNotes);
  server.route("/api/notes/:id").get(authenticate, getNote);
  server.route("/api/notes").post(authenticate, createNote);
};
