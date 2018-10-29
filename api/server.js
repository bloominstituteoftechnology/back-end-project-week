const express = require('express');
const applyGlobalMiddleware = require('../config/globalMiddleware.js');
const noteRoutes = require('../routes/noteRoutes.js');

// server
const server = express();

// middleware
applyGlobalMiddleware(server);

// routes
server.use('/notes', noteRoutes);

module.exports = server;
