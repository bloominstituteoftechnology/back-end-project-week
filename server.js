const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const apiRoutes = require("./api");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors({}));

server.use("/api", apiRoutes);

module.exports = server;
