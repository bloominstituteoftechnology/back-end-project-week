const express = require('express')
const helmet = require('helmet')
const logger = require('morgan')
const cors = require('cors')
const port = process.env.PORT || 3945

const login_route = require('./DB/Routes/login-route')
const logout_route = require('./DB/Routes/logout-route') 
const register_route = require('./DB/Routes/register-route')
const note_routes = require('./DB/Routes/note-routes')
const server = express()

server.use(
 helmet(),
 cors(),
 logger('dev'),
 express.json(),
)

// Register Routes (confirmed working.)
server.use('/api/register', register_route)
//Logout Routes (untested)
server.use('/api/logout', logout_route)
// Login Routes (untested)
server.use('/api/login', login_route)
// Note Routes (confirmed working)
server.use('/api/notes', note_routes)

server.listen(port, () => {
 console.log(`Server is now running live on ${port}`)
})