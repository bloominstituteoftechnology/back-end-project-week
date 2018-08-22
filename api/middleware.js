const helmet = require('helmet')
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')

module.exports = (server) => {
    server.use(helmet())
    server.use(cors())
    server.use(morgan('dev'))
    server.use(express.json())
}

