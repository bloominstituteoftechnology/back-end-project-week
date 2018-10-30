const express = require('express')
const cors = require('cors')
const server = express()

server.use(cors())
server.use(express.json())


module.exports = server
