const express = require('express')
const mongoose = require('mongoose')
const { mongoUri, mongoOptions } = require('./config')

const server = express()

server.get('/', (req, res) => {
  res.send({ message: 'hello' })
})

const port = process.env.PORT || 3000

mongoose.connect(mongoUri, mongoOptions)
  .then(() => server.listen(port, () => console.log(`Listening on ${port}`)))