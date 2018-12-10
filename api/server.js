// import dependencies
const express = require("express");
const cors = require("cors");

// internal imports
const notesRouter = require("../notes/notesRouter");

// init server
const server = express();

//middleware
server.use(cors());
server.use(express.json());

// endpoints for notes via router
server.use("/api/notes", notesRouter);

module.exports = server;
