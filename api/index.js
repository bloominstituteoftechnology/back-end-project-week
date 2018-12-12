const express = require("express");

const configureMiddleware = require("../config");

const server = express();

configureMiddleware(server);

server.get("/", (req, res) => {
  res.redirect("/docs.html");
});

module.exports = server;
