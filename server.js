const express = require('express')
const cors = require('cors')
const notesRouter = require('./notes/notesRouters.js')
const server = express()

server.use(cors())
server.use(express.json())
server.use("/api/notes", notesRouter)

module.exports = server
