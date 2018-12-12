const express = require("express");
const server = express();
const logger = require("morgan");
const db = require("../database/dbConfig");
const cors = require("cors");
const helmet = require("helmet");

const NotesRouter = require("../routes/noteRoutes");

server.use(logger("dev"));
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(NotesRouter);

const PORT = process.env.PORT || 4000;

module.exports = server;
