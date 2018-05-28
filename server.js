const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const APIroutes = require("./api/routes");
const server = express();

server.use(express.json())
server.use(helmet())
server.use(cors())

APIroutes(server)

module.exports = server;