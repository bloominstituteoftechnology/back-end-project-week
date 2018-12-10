const express = require('express');
const server = express();

// bringing in the relevant middleware
const configureMiddleware = require('../config/middleware');
configureMiddleware(server);

// API Status at base URL
server.get('/', (req, res) => res.send({API: "live"}));

module.exports = server;