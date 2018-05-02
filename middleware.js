const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

module.exports = function(server) {
  server.use(helmet());
  server.use(morgan('combined'));
  server.use(express.json());
  server.use(cors());
};
