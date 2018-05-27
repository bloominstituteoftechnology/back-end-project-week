const express = require("express");
const helmet = require("helmet");
const userRouter = require("./users/users.controller");

const server = express();

server.use(express.json())
server.use(helmet())
server.use('/api/users', userRouter)

server.get('/', (req, res) => res.send('server is functional'))

module.exports = server;