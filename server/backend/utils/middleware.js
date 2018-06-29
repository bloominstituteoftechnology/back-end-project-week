const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const config = require("../../config")
const corsOptions = {
  origin: config.origin, //Only the localhost can connect
  credentials: true
};

module.exports = function(server) {
  server.use(helmet());
  server.use(express.json());
  server.use(cors(corsOptions));
};
