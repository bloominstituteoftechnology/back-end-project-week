const express = require("express");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.listen(8000, () => {
  console.log("== LISTENING ON PORT 8K ==");
});
