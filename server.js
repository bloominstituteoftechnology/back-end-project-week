const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const noteRouter = require("./routes/noteRouter");
const userRouter = require("./routes/userRouter");

const server = express();

server.use(express.json()); //built in body parser
server.use(cors()); //Cross Origin Resource Sharing
server.use(helmet()); //helps secure Express apps by setting various HTTP headers
server.use(morgan("combined"));
server.use("/notes", noteRouter);
server.use("/users", userRouter);

if (process.env.NODE_ENV !== "test") {
  const uri = process.env.DB_HOST || "mongodb://localhost/notes";
  const port = process.env.PORT || 8888;

  server.listen(port, () => console.log(`App running on port ${port}`));

  // mongoose.Promise = global.Promise;
  mongoose
    .connect(uri)
    .then(() => console.log(`\n>>>  Successfully connected to mLab db  <<<\n`))
    .catch(err => console.log("Error connecting to mLab db"));

  server.get("/", (req, res) => {
    res.status(200).json({ api: "running" });
  });
}

module.exports = server;
