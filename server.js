const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');

// Server
const server = express();

// Middelware
server.use(express.json());
server.use(morgan());
server.use(helmet());
server.use(cors());
server.use(logger);

// Logger
const logger = (req, res, next) => {
  console.log('d-(OvO")z looks correct to me', req.body);

  next();
};

// Server Code
server.get('/', (req, res) => {
  // API Check
  res.json({ api: 'Running..' });
});

// Port
const port = server.listen(port, () => console.log('API Running on Heroku'));
