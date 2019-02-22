const express = require('express')
const cors = require('cors')

const server = express()

const notesRouter = require('./routes/notesRoutes')
const userRouter = require('./routes/userRoutes')

server.use(express.json())
server.use(cors())


server.use('/notes/:id', notesRouter)

server.use('/users', userRouter)

module.exports = server