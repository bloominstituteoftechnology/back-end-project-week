const express = require('express');

const configMiddleware = require('../config/middleware.js');

const server = express();

configMiddleware(server);

module.exports = server;