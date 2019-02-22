const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const configureRoutes = require("../config/routes.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan("short"));

configureRoutes(server);

module.exports = {
    server
};
