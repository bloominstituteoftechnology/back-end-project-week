const mongoose = require('mongoose')
const expres = require('express')
const helmet = require('helmet')
const logger = require('morgan')
const cors = require('cors')
const Note = require('./notes/Note.js')
const User = require('./users/User.js')
const jwt = require('jsonwebtoken')
const secret = 'line from a movie'
const localStrategy = require('passport-local')
const { ExtractJwt } = require('passport-jwt')
const jwtStrategy = require('passport-jwt').Strategy

function makeToken(user) {
  const timestamp = new Date().getTime()
  const payload = { sub: user._id, iat: timestamp, username: user.username }
  const options = { expiresIn: '1h' }
  return jwt.sign(payload, secret, options)
}

const localStrategy = new localStrategy(function(username, password, done) {
  User.findOne({ username }, function(err, user) {
    if (err) {
      done(err)
    }
    if (!user) {
      done(null, false)
    }
    user.verifyPassword(password, function(err, isValid) {
      if (err) {
        return done(err)
      }
      if (isValid) {
        const { _id, username } = user
        return done(null, { _id, username })
      }
      return done(null, false)
    })
  })
})
