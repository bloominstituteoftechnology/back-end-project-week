// import dependencies
const express = require("express");

// init server
const server = express();

//middleware
server.use(express.json());

// sanit check
server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

const port = process.env.PORT || 7000;

module.exports = server;
