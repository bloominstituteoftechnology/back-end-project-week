require('dotenv').config()
const User = require('../models').User

const { ExtractJwt } = require('passport-jwt')
const JwtStrategy = require('passport-jwt').Strategy

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}

const jwtStrategy = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.sub)
    .then(user => {
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
    .catch(err => {
      return done(err, false)
    })
})

module.exports = jwtStrategy
