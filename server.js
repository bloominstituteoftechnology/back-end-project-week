const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongodb = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;

const noteRouter = require("../api/Routes/noteRouter.js");
const userRouter = require("../api/Routes/userRouter.js");

const server = express();

function logger(req, res, next) {
  console.log("body: ", req.body);
  next();
}

server.use(helmet());
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(cors());
server.use(express.json());

server.use("/api/Notes", noteRouter);
server.use("/api/User", userRouter);

server.get("/", (req, res) => {
  res.json({ api: "Running..." });
});

module.exports = {
    server
  };