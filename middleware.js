const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const  cors = require('cors')
module.exports = server => {
  server.use(morgan('dev'))
  server.use(cors())
  server.use(helmet())
  server.use(express.json())
  // server.use(cors({ origin: 'localhost:3000' }))
}