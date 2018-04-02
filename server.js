const express = require('express');
const helmet = require('helmet');
const routes = require('./api/routes');

const server = express();
server.use(helmet());
server.use(express.json());

routes(server);

module.exports = server;
