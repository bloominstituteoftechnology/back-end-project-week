const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000

const server = express()
const setupMiddleware = require('./setup/middleware')(server)
const URI = 'mongodb://adfaris:adfaris@ds263639.mlab.com:63639/lambda_notes'
mongoose
  .connect(URI)
  .then(cnn => {
    console.log('\n === connected to mongo === \n')
  })
  .catch(err => {
    console.log('\n=== Error connecting to mongo === \n')
  })

server.listen(PORT, () => console.log(`Listening on ${PORT}`))
