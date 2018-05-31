const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const noteController = require("./notes/notesController");
const userController = require("./users/userController");

const port = process.env.PORT || 5000;

const server = express();

if (process.env.NODE_ENV !== 'test') {
  server.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
  mongoose.connect("mongodb://${loginInfo.username}:${loginInfo.password}@")
		.then(() => console.log('Successfully connected to MongoDB'))
		.catch(err => console.log('Error connecting to MongoDB'));
}

server.use(helmet());
server.use(cors());
server.use(morgan("combined"));
server.use(express.json());
server.use("/notes", noteController);
server.use("/user", userController);



module.exports = server;
