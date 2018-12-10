const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

module.exports = server => {
  server.use(morgan('dev'))
  server.use(helmet())
  server.use(express.json())
}