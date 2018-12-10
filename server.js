const express = require("express");
const middlewareConfig = require('./middleware/middlewareConfig.js');
// Initializes the server
const server = express();
// Middleware setup
middlewareConfig(server);
// Endpoints
server.get("/", (req, res) => res.send("API UP"));

module.exports = server;
