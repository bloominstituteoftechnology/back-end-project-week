require('dotenv').config()

const server = require('express')()
const errorHandler = require('./errorHandler')

//* Middleware & Routes
require('./middleware')(server)
require('./routes')(server)

//* Error Handler
server.use(errorHandler)

module.exports = server
