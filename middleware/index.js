const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const cors = require('cors');

module.exports = server => {
  server.use(cors());
  server.use(express.json());
  server.use(helmet());
  server.use(logger("dev"));
};
