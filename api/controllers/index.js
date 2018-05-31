const userRouter = require("./users.controller");
const loginRouter = require("./login.controller");
const notesRouter = require("./notes.controller");
const googleRouter = require("./google.controller");

module.exports = {
  userRouter,
  loginRouter,
  notesRouter,
  googleRouter
}