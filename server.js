const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const notesRouter = require("./notes/notesRouter");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use(express.static(path.join(__dirname, "public")));
server.use("/note", notesRouter);

server.get("/", (req, res) =>
  res.send(
    "Welcome to the Notes API Server! Navigate to https://notes-api-backend.herokuapp.com/notes.md for more information!"
  )
);

module.exports = server;
