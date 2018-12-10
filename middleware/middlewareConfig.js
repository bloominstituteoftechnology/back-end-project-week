const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const middlewareConfig = server => {
  server.use(express.json());
  server.use(morgan("dev"));
  server.use(helmet());
};
module.exports = middlewareConfig;
