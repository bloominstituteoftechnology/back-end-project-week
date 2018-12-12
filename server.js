// config server
// middleware add functionalities
// route manages server side routing
// errorHandler manage error messages.

const server = require('express')()
const errorHandler = require('./helpers/errorHandler')
const notesRouter = require('./notes/notesRouter.js')

//* Sanity Check
server.get("/", (req, res) => {
    res.status(200).json(`Server Online in port = ${PORT}`);
  });

  
//* Middleware & Routes
require('./middleware')(server)

server.use('/api', notesRouter)

//* Error Handler
server.use(errorHandler)

module.exports = server
