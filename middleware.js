require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const passport = require('passport')
const localStrategy = require('./strategies/localStrategy')
const jwtStrategy = require('./strategies/jwtStrategy')

passport.use(localStrategy)
passport.use(jwtStrategy)

module.exports = server => {
  server.use(passport.initialize())
  server.use(express.json())
  server.use(express.urlencoded({ extended: false }))
  server.use(express.static('public'))
  server.use(logger('dev'))
  server.use(helmet())
  server.use(cors())
}
