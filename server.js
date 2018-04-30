const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const routes = require('./routes/routes');

const server = express();

server.use(cors());
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

server.get('/', (req, res) => {
  res.send({ api: 'up and running!' });
});

routes(server);

module.exports = server;
