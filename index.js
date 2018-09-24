const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.get("/", (req, res) => {
  res.send("This server is fully operational.");
});

server.listen(9000);
