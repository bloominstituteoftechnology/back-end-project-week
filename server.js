const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require("mongoose");
const server = express();

const { authenticate } = require("./api/utilities/middleware");

const userRouter = require("./api/controllers/userController");
const notesRouter = require("./api/controllers/noteController");

server.use(cors({}));
server.use(bodyParser.json());
server.use(helmet());
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.get('/', (req, res) => {
  res.send('Welcome to Lambda Notes')
});
server.use("/api/notes", authenticate, notesRouter);
server.use("/api/users", userRouter);

module.exports = server;
