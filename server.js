const express = require('express');
const morgan = require('morgan');

const configureRoutes = require('./config');

const server = express();

server.use(express.json());
server.use(morgan('dev'));
configureRoutes(server);

module.exports = server;
