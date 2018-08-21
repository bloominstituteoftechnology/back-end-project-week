const helmet = require('helmet');
const express = require('express');
const cors = require('cors');

module.exports = app => {
  app.use(express.json());
  app.use(helmet());
  app.use(cors());
};
