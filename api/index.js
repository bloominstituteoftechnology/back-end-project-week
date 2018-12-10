const express = require("express");

const configureMiddleware = require("../config");

const server = express();

configureMiddleware(server);

module.exports = server;
