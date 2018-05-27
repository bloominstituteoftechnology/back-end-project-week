const express = require("express");
const helmet = require("helmet");
const router = require("./users/users.controller");

const server = express();

server.use(express.json())
server.use(helmet())
server.use('/api/users', router)

server.get('/', (req, res) => res.send('server is functional'))

module.exports = server;