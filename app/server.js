const express = require('express');
const morgan = require('morgan');

//  const apiRouter = require('./api/apiRouter');

const server = express();
const debug = false;

debug ? server.use(morgan('combined')) : null;

server.use(express.json());
// server.use('/api', apiRouter);

server.get('/', (req, res) => {
  res.send({ api: `running` });
});

module.exports = server;
