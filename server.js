const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const noteController = require("./notes/notesController");

mongoose
  .connect("mongodb://test:test@ds163769.mlab.com:63769/lambda-notes")
  .then(() => {
    console.log("Connected to Mongo.");
  })
  .catch(err => {
    console.log("Error connecting to the database");
  });

const server = express();

server.use(helmet());
server.use(morgan("dev"));
server.use(express.json());
server.use(noteController);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
