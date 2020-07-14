const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

//sanity check
server.get("/", (req, res) => {
  res.send("server is up");
});

server.listen(8000, () => console.log("/n server up on port 8000 /n"));
