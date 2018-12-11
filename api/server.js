// import dependencies
const express = require("express");
const cors = require("cors");

// internal imports
const notesRouter = require("../notes/notesRouter");
const tagsRouter = require("../tags/tagsRouter");
// init server
const server = express();

//middleware
server.use(cors());
server.use(express.json());

// sanity check
server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

// endpoints for notes via router
server.use("/api/notes", notesRouter);
// endpoints for tags via router
server.use("/api/tags", tagsRouter);
module.exports = server;
