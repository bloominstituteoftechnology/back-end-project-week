const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");
const server = express();

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/notes")
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Unable to connect to database");
  });

const corsOptions = {
  origin: "mongodb://localhost/notes",
  credentials: true
};

server.use(bodyParser.json());
server.use(cors(corsOptions));

const port = 8000;

server.listen(port, () => {
  console.log(`Server is now listening on port ${port}`);
});

routes(server);

module.exports = { server };
