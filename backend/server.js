const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");
const server = express();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/notes");

const corsOptions = {
  origin: "mongodb://localhost/notes",
  credentials: true
};

server.use(bodyParser.json());
server.use(cors(corsOptions));

const port = 8000;

//routes

server.listen(port, () => {
  console.log(`Server is now listening on port ${port}`);
});
