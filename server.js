const express = require('express')

const configureMiddleware = require('./middleware')
const server = express()

configureMiddleware(server)

server.get('/', (req, res) => {
  res.status(200).json({ message: 'server up!'})
})


module.exports = server;