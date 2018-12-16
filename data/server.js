const express = require('express');
const cors = require('cors');
const helmet = require('helmet')

const noteRouter = require('../api/noteRouter');
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/notes', noteRouter);

module.exports = server;