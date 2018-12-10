// Imports
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');

const middlewareConfig = server => {
  server.use(express.json());
  server.use(morgan('dev'));
  server.use(helmet());
  server.use(cors());
};

module.exports = middlewareConfig;
