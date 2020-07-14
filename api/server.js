const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const SERVER = express();
require("dotenv").config();

// ROUTERS HERE
const notesRouter = require("./routes/notesRouter");
const authRouter = require("./routes/authRouter");

SERVER.use(express.json(), cors(), helmet(), logger("dev"));

// USE ROUTERS HERE
SERVER.use("/api/notes", notesRouter);
SERVER.use("/api/auth", authRouter);

SERVER.get("/", (req, res) => {
  res.send("Server Active");
});

module.exports = SERVER;
