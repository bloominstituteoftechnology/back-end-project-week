const express = require("express");

const server = express();

server.use(express.json());
server.use("./notes", require("./notes"));

module.exports = server;
