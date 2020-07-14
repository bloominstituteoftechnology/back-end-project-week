require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const cookie = require('cookie-session')



// Routes
const noteRoutes = require('./routes/noteRoutes')
const authRoutes = require('./routes/authRoutes.js')

// Initialize Server
const server = express()
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

// Middleware
server.use(express.json())
server.use(helmet())
server.use(cors(corsOptions))
server.use(cookie({
    name: 'login_cookie',
    secret: ";ksdfsdfjsoidfjsd",
    maxAge: 1000 * 60 * 60
}))

// End Point Routes
server.use('/api/notes', noteRoutes)
authRoutes(server)




// Sanity Check
server.get('/', (req, res) => {
    res.status(200).json({api: 'alive!'})
})

module.exports = server;