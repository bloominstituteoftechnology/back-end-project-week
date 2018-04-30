const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const register = require('./Routes/register');
const login = require('./Routes/login');

const server = express();

server.use(cors());
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

server.get('/', (req, res) => {
  res.send({ api: 'up and running!' });
});

server.use('/api/register', register);
server.use('/api/login', login);

module.exports = server;
