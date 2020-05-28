const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../users/auth-router.js");
const notesRouter = require("../notes/notes-router.js");
const usersRouter = require("../users/users-router.js");
const restricted = require("../middleware/restricted-middleware.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", restricted, usersRouter);
server.use("/api/notes", notesRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;

//Optional: if database has role, below is checkRole middleware, it could be added to userRouter after restricted
function checkRole(role) {
  return (req, res, next) => {
    if (
      req.decodedToken &&
      req.decodedToken.role &&
      req.decodedToken.role.toLowerCase() === admin
    ) {
      next();
    } else {
      res.status(403).json({ you: "Shall not pass!" });
    }
  };
}
