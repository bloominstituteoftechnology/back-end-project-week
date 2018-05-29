const express = require('express')
const mongoose = require('mongoose')
const { getSessionToken } = require('./util')
const { mongoUri, mongoOptions } = require('./config')
const User = require('../models/User')

const server = express()

server.use(express.json())



server.get('/', (req, res) => {
  res.send({ message: 'hello' })
})

server.post('/api/user/register', async (req, res, next) => {
  const user = await User.create(req.body)
  const token = getSessionToken(user)
  res.status(201).send({ token })
})

server.post('/api/user/login', async (req, res, next) => {
  const user = await User.login(req.body)
  if (!user) {
    res.status(400).send({ error: 'Invalid username or password' })
  }
  const token = getSessionToken(user)
  res.status(200).send({ token })
})

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send({ error: err })
})

module.exports = server