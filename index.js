const express = require('express')
const db = require('./config/db')
const setupMiddleware = require('./config/middleware')
const setupRoutes = require('./config/routes')
const server = express()

const { SERVER_PORT } = process.env
const port = SERVER_PORT || 5000

setupMiddleware(server)
setupRoutes(server)

db.connectTo()
  .then(() => {
    server.listen(port, () => {
      console.log('API connected to the web server and MongoDB.')
      console.log(`It is running on port ${port}.`)
    })
  })
  .catch(err => {
    console.log('An error occurred while trying to connect to the database server.\n', err)
  })