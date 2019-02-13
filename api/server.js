const express = require("express");
const cors = require("cors");
const server = express();

server.use(express.json(), cors());

//request for note list
server.get("/all", async (req, res) => {
   res.status(200).json({api: "running"});
});

module.exports = server;