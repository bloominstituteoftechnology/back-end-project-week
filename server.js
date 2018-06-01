
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const NotesRouter = require("./Notes/NotesRouter.js");
const UserRouter = require("./Users/UserRouter.js");
const cors = require("cors");
const server = express();

server.use(helmet());
server.use(cors());
server.use(morgan("combined"));
server.use(express.json());
server.use("/api/notes", NotesRouter);
server.use("/api/user", UserRouter);

server.get('/', (req, res) => res.send('API Is Running...'));

mongoose.connect(
  "mongodb://<dbuser>:<dbpassword>@ds239940.mlab.com:39940/lambdanotes",
  {},
  err => {
    if (err) return console.log("Error connecting to the database");
    console.log("Connected to Mongo.");
  }
);

const PORT = process.env.PORT || 5000;
server
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
module.exports = server;