const express = require('express')
const notesRouter = require('./notes/notesRouters.js')
const server = express()

server.use(express.json())
server.use("/api/notes", notesRouter)

module.exports = server