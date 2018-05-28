const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./api/routes");
const server = express();

server.use(express.json())
server.use(helmet())
server.use(cors())

routes(server)

module.exports = server;