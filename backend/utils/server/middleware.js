const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
// Utils
const { checkAuth } = require('../controllers/authHelpers')

module.exports = function(server) {
  server.use(helmet());
  server.use(cors({
    origin: 'http://localhost:3000'
  }));
  server.use(morgan('dev'));
  server.use(express.json());
  // Specific Routes
  server.use('/notes', checkAuth);
};
