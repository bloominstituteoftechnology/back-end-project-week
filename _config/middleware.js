const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

const frontEndPort = 'condescending-fermi-c0580d.netlify.com'

module.exports = function(server) {
  server.use(helmet())
  server.use(morgan('dev'))
  server.use(express.json())
  // server.use(cors({ origin: `https://${frontEndPort}`}))
  server.use(cors())
}