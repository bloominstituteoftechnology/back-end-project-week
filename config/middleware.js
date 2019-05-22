const EXPRES = require('express')
const MORGAN = require('morgan')
const HELMET = require('helmet')
const CORS = require('cors')

module.exports = server => {
  server.use(HELMET())
  server.use(MORGAN('dev'))
  server.use(EXPRES.json())
  server.use(CORS())
}