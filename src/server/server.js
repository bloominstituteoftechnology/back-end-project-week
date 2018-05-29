const express = require('express')
const mongoose = require('mongoose')
const { mongoUri, mongoOptions } = require('./config')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  res.send({ message: 'hello' })
})

module.exports = server