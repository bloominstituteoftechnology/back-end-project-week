const express = require("express");
const server = express();
const logger = require("morgan");

server.use(logger("dev"));
server.use(express.json());

module.exports = server;
