const express = require('express');
const morgan = require('morgan');

const router = require('./router');

const server = express();
const debug = false;

debug ? server.use(morgan('combined')) : null;

server.use(express.json());
server.use('/api', router);

server.get('/', (req, res) => {
  res.send({ server: `running` });
});

module.exports = server;
