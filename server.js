const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

// Initialize Server
const server = express()

// Middleware
server.use(express.json())
server.use(helmet())
server.use(cors())

// End Point Routes




// Sanity Check
server.get('/', (req, res) => {
    res.status(200).json({api: 'alive!'})
})

module.exports = server;