const express = require("express");

const server = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const notesRouter = require("../api/routes/notesRouter");
const tagsRouter = require("../api/routes/tagsRouter");

server.use(helmet());
server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

server.use("/api/notes", notesRouter);
server.use("/api/tags", tagsRouter);

module.exports = server;
