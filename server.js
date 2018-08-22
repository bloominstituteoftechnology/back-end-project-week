require('dotenv').config()
const server = require('express')() // Create instance of Express
require('./api/middleware')(server) // Pass that instance to both middleware and route handlers
require('./api/apiRouter')(server)

const port = 3300
server.listen((process.env.PORT || port), () => {
    console.log(`server running on port ${port}\n`)
})
