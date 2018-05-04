const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const config = require('./api/config');

// create the server
const server = express();
// use json
server.use(express.json());

server.use(morgan('dev'));
server.use(helmet());

//cross origin request sharing permissions
const corsOptions = {
  origin: config.origin,
  credentials: true,
};
server.use(cors(corsOptions));

const routes = require('./api/routes');

routes(server);

module.exports = server;
