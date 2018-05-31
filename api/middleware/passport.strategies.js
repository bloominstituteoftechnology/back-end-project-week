const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GoogleTokenStrategy = require("passport-google-plus-token");
const FacebookTokenStrategy = require('passport-facebook-token');
const { ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const User = require('../models/users.schema');

// compares hashed passwords
const localStrategy = new LocalStrategy((username, password, done) => {
  User
    .findOne({ "local.username": username })
    .then(user => {
      user
        .validatePassword(password)
        .then(isValid => isValid ? done(null, user) : done(null, false))
        .catch(err => done(err, false))
    }).catch(err => done(err, false))
})

// extracts token --> decodes token --> finds user from payload data
const JWTstrategy = new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('Authorization'), 
  secretOrKey: process.env.SECRET
}, async (payload, done) => {
  User
    .findById(payload.id)
    .then(user => user ? done(null, user) : done(null, false))
    .catch(err => done(err, false)) 
})

// login with google
const GoogleStrategy = new GoogleTokenStrategy({
  clientID: "962293448005-vas5rftptuuqf6tcueb9ismhmojn32oq.apps.googleusercontent.com",
  clientSecret: "UoFUZ53KU_uSkOIi3wGRP16X"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ "google.id": profile.id })
    if (existingUser) done(null, existingUser)

    const userData = { method: 'google', google: { id: profile.id, email: profile.emails[0].value } }
    const newUser = await User.create(userData)
    done(null, newUser)

  } catch(error) {
    done(error, false, error.message)
  }
})

const FacebookStrategy = new FacebookTokenStrategy({
  clientID: "967730106723439",
  ClientSecret: "2d8eb9b59dc04bf74d8c7e965ff45c58"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ "facebook.id": profile.id })
    if (existingUser) done(null, existingUser)

    const userData = { method: 'facebook', facebook: { id: profile.id, email: profile.emails[0].value } }
    const newUser = await User.create(userData)
    done(null, newUser)

  } catch(error) {
    done(error, false, error.message)
  }
})

module.exports = {
  localStrategy,
  JWTstrategy,
  GoogleStrategy,
  FacebookStrategy
}