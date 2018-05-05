const cors = require("cors");
const express = require("express");

module.exports = function(server) {
  server.use(express.json());
  server.use(cors({origin: "*"}));
};
