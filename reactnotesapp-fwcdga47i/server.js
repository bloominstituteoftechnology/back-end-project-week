const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const router = require('./router');

const server = express();
const debug = false;

server.use(
  cors({
    origin: 'https://reactnotesapp-fwcdga47i.herokuapp.com',
    credentials: true,
  }),
);

debug ? server.use(morgan('combined')) : null;

server.use(express.static(path.join(__dirname, 'client/build')));
server.use(express.json());
// server.use(cors({ origin: 'http://localhost:3000', credentials: true }));

server.use('/api', router);

server.get('/', (req, res) => {
  res.send({ server: `running` });
});

module.exports = server;
