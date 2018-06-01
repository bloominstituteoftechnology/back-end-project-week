const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const noteRouter = require("./notes/noteRouter");
const userRouter = require("./users/userRouter");

const server = express();

const uri = process.env.DB_HOST || "mongodb://localhost/notes";
const port = process.env.PORT || 8888;

if (process.env.NODE_ENV !== "test") {
  server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));

  // mongoose.Promise = global.Promise;
  mongoose
    .connect(uri)
    .then(() => console.log(`\n=== Successfully connected to mLab db @  ===\n`))
    .catch(err => console.log("Error connecting to mLab db"));
}

server.use(express.json()); //built in body parser
server.use(cors()); //Cross Origin Resource Sharing
server.use(helmet()); //helps you secure your Express apps by setting various HTTP headers
server.use(morgan("combined"));
server.use("/notes", noteRouter);
server.use("/users", userRouter);

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ error: message });
}

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

module.exports = server;
