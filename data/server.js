const express = require('express');
const noteRouter = require('./api/noteRouter');
const helmet = require('helmet')

const server = express();

server.use(helmet);
server.use(express.json());
server.use('/api/notes', noteRouter);

module.exports = server;