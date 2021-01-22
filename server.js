const express = require('express');
const server = express();
const morgan = require('morgan')

const cors = require('cors');

server.use(express.json());
server.use(morgan('tiny'))
server.use(cors());

server.get('/', (req, res) => {
    res.send('Server is up running 👍');
})

//Useful for ./config/routes.js as module.export in function form so need to pass server for all routes
// const configRoutes = require('./config/routes')
// configRoutes(server)

const users = require('./routes/users.js')
server.use('/api/users', users)

const notes = require('./routes/notes.js')
server.use('/api/notes', notes)


module.exports = server;