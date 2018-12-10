const express = require('express');
const cors = require('cors');

const configureRoutes = require('./config/routes');

const server = express();

server.use(express.json());
server.use(cors());

configureRoutes(server);

module.exports = {
    server
}