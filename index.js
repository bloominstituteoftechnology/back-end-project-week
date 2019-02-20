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
server.post('/api/register', register_route)
// Login Routes
// server.post('/api/login', login_route)
//Logout Routes
// server.post('/api/logout', logout_route)
// Note Routes
server.get('/api/notes', note_routes)
server.get('/api/notes', note_routes)
server.post('/api/notes', note_routes)
server.put('/api/notes', note_routes)
server.delete('/api/notes', note_routes)

server.listen(port, () => {
 console.log(`Server is now running live on ${port}`)
})