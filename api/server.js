const express = require('express');
const noteRoutes = require('../Routes/noteRoutes');
const server = express();
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const middleware = [logger('dev'), express.json(), helmet(), cors()]

server.disable("etag");
server.use('/', middleware)

server.use('/notes', noteRoutes);

module.exports = server;