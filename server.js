const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());

server.get("/", (req, res) => {
  res.send("<h1>Hello<h1>");
});

server.listen(9000, () => console.log("API running..."));
