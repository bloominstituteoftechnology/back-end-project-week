const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

module.exports = (app, env) => {
  app.use(helmet())
  app.use(express.json())
  app.use(cors({
    origin: '*', // Change this after deploying
    methods: 'GET, PUT, POST, DELETE'
  }))
}