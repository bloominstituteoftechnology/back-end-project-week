const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const routes = require('./routes/routes');

const server = express();
const corsOptions = {
  origin: 'https://lambda-notes-project-second.herokuapp.com',
  credentials: true
};

server.use(cors(corsOptions));
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

server.get('/', (req, res) => {
  res.send({ api: 'up and running!' });
});

routes(server);

module.exports = server;
