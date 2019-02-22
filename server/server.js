const express = require('express')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(cors())

const notesRouter = require('./routes/notesRoutes')
const userRouter = require('./routes/userRoutes')



server.use('/', notesRouter)

server.use('/users', userRouter)

module.exports = server