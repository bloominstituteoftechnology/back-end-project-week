const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

const noteRouter = require("./notes/noteRouter.js");
const userRouter = require("./users/userRouter.js");

const server = express();

server.use(helmet());
server.use(cors({ origin: "https://front-end-project-zc.herokuapp.com" }));
server.use(express.json());

server.get("/", function(req, res) {
  res.json({ api: "running" });
});

server.use("/api/notes", noteRouter);
server.use("/api/users", userRouter);

mongoose.Promise = global.Promise;

mongoose.connect(
  `mongodb://${process.env.MLABUSER}:${
    process.env.MLABPASS
  }@ds217921.mlab.com:${process.env.MLABPORT}/lambdanotes`,
  {},
  error => {
    if (error) console.log("Database connection failed");
    else console.log("Successfully Connected to MongoDB");
  }
);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n=== API running on http://localhost:${port} ===\n`);
});
