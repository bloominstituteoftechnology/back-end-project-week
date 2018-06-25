const express = require('express')

const db = require('./_config/db')

const server = express()

const PORT = 5000

db.connectTo('notes')
  .then(() => {
    console.log('*** Successfully connected to the Database ***')
    server.listen(PORT, () => {
      console.log(`*** Listening on port ${PORT} ***`)
    })
  })
  .catch( err => {
    console.log('*** Failed to connect to the server ***')
  })