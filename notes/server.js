const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const router = require('./router');

const server = express();
const debug = false;

debug ? server.use(morgan('combined')) : null;

server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000', credentials: true }));

server.use('/api', router);

server.get('/', (req, res) => {
  res.send({ server: `running` });
});

module.exports = server;
