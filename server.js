const express = require('express')
const notesRouter = require('./notes/notesRouters.js')
const cors = require('cors')
const server = express()

server.use(cors())
server.use(express.json())
server.use("/api/notes", notesRouter)

module.exports = server