const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");
const server = express();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/notes");

server.use(bodyParser.json());

const port = 8000;

server.listen(port, () => {
  console.log(`Server is now listening on port ${port}`);
});
