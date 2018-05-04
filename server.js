const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const noteController = require("./notes/notesController");
const userController = require("./users/userController");
const cors = require("cors");

const server = express();

server.use(helmet());
server.use(cors());
server.use(morgan("combined"));
server.use(express.json());
server.use("/api/notes", noteController);
server.use("/api/user", userController);

module.exports = server;
