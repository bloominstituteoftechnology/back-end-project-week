const express = require('express');
const noteRoutes = require('../Routes/noteRoutes');
const server = express();
const logger = require('morgan');
const helmet = require('helmet');

server.use(express.json());
server.use(helmet());
server.use(logger('dev'))
server.disable("etag");

server.use('', noteRoutes);

module.exports = server;