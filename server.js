const express = require("express");
const cors = require("cors");
require("dotenv").config();

const configureRoutes = require("./config/routes");

const server = express();
const corsOptions = {};

server.use(express.json());
server.use(cors());

configureRoutes(server);

module.exports = {
  server
};
