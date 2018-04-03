const { makeUser, logUser } = require("../controllers/UserController");
const {
  touchNote,
  popNotesById,
  popNotesById,
  updateNote,
  deleteNote
} = require("../controllers/NoteController");
const { authToken } = require("../authenticate/auth.js");
