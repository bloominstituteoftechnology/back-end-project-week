const express = require('express')
const helmet = require('helmet')
const logger = require('morgan')
const port = process.env.port || 3945

const server = express()

server.use(
 helmet(),
 logger('dev'),
 express.json(),
)

// server.use('/api/login', login-route)
// server.use('/api/register', register-route)
// server.use('/api/notes', note-routes)
// server.use('/api/logout', logout-router)

server.listen(port, () => {
 console.log(`Server is now running live on ${port}`)
})