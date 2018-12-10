const express = require('express');

const configureRoutes = require('./config/routes');

const server = express();

server.use(express.json());

configureRoutes(server);

module.exports = {
    server,
};