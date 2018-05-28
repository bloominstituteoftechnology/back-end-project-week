const express = require("express");
const helmet = require("helmet");
const { authenticate } = require("./users/middleware");
const userRouter = require("./users/controllers/users.controller");
const loginRouter = require("./users/controllers/login.controller");
const notesRouter = require("./users/controllers/notes.controller");

const server = express();

server.use(express.json())
server.use(helmet())

server.use('/api/users', userRouter)
server.use('/api/login', loginRouter)
server.use('/api/notes', authenticate, notesRouter)

server.get('/', (req, res) => res.send('server is functional'))

module.exports = server;