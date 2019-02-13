const express = require('express');
const noteRoutes = require('../Routes/noteRoutes');
const server = express();
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

server.disable("etag");
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger('dev'))


server.use('/api/notes', noteRoutes);

module.exports = server;