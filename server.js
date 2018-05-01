const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const noteController = require("./notes/notesController");
const userController = require("./user/userController");
const cors = require("cors");

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
server.use(cors({ origin: "https://kaits-lambda-notes.netlify.com" }));
server.use(morgan("combined"));
server.use(express.json());
server.use("/api/notes", noteController);
server.use("/api/user", userController);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
