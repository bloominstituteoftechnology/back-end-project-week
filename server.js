const express = require("express");
const server = express();
server.use(express.json());

server.get("/tasks", (req, res) => {
  res.status(200).json(db);
});



module.exports = server; 