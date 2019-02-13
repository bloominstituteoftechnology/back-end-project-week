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

// server.use('/api/login', user-routes)
// server.use('/api/register', user-router)
// server.use('/api/notes', note-routes)


server.listen(port, () => {
 console.log(`Server is now running live on ${port}`)
})