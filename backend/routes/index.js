const { makeUser, logUser } = require("../controllers/UserController");
const {
  touchNote,
  popNotes,
  popNotesById,
  updateNote,
  deleteNote
} = require("../controllers/NoteController");
const { authenticateToker } = require("../authenticate/auth.js");

module.exports = server => {
  server.post("/api/login", logUser);
  server.post("/api/user", makeUser);
  server
    .route("/api/notes")
    .post(authenticateToker, touchNote)
    .get(authenticateToker, popNotes);
  server
    .route("/api/notes/:id")
    .get(popNotesById)
    .put(updateNote)
    .delete(deleteNote);
};
