const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const capital = require("./capitalizeTitle");

module.exports = server => {
  server.use(express.json());
  server.use(helmet());
  server.use(morgan("dev"));
  server.use(capital);
  server.use(cors());
};
