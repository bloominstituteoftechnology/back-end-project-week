const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const APIroutes = require("./api/routes");
const server = express();

server.use(express.json())
server.use(helmet())
server.use(cors({ 
  origin: "https://lambdanotes-jeffreyflynn.netlify.com", 
  credentials: true
}))

APIroutes(server)

module.exports = server;
