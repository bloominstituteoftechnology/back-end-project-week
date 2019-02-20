const express = require('express')
const helmet = require('helmet')
const logger = require('morgan')
const port = 3945

const login_route = require('./DB/Routes/login-route')
const logout_route = require('./DB/Routes/logout-route') 
const register_route = require('./DB/Routes/register-route')
const note_routes = require('./DB/Routes/note-routes')
const server = express()

server.use(
 helmet(),
 logger('dev'),
 express.json(),
)

// Register Routes
// Login Routes
//Logout Routes
// Note Routes
server.use('/api/register', register_route)
server.use('/api/logout', logout_route)
server.use('/api/login', login_route)
server.use('/api/notes', note_routes)
server.use('/api/notes', note_routes)
server.use('/api/notes', note_routes)
server.use('/api/notes', note_routes)
server.use('/api/notes', note_routes)

server.listen(port, () => {
 console.log(`Server is now running live on ${port}`)
})