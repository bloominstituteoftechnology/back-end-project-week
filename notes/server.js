const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const router = require('./router');

// const { validateToken } = require('./services/auth');

const server = express();
const debug = false;

debug ? server.use(morgan('combined')) : null;

server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000', credentials: true }));

server.use('/api', router);

server.get('/', (req, res) => {
  res.send({ server: `running` });
});

// server.post('/validate', validateToken, (req, res) => {
//   res.send({ decoded: req.decoded });
// });

module.exports = server;
