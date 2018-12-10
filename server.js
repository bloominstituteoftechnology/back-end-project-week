const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const notesRouter = require("./notes/notesRouter");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/note", notesRouter);

server.get("/", (req, res) => res.send("Welcome to the Notes API Server!"));

module.exports = server;
