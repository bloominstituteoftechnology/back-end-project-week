const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: JwtStrategy } = require('passport-jwt')
const { ExtractJwt } = require('passport-jwt')
const jwt = require('jsonwebtoken')
const User = require('../user/model')
const { secret } = require('../../config/env')

const createToken = ({ _id, email, username }) => {
  const payload = {
    iat: new Date().getTime(),
    _id,
    username,
    email
  }

  const options = { expiresIn: '1d' }

  console.log('createToken', payload)
  const wt = jwt.sign(payload, secret, options)
  console.log('createToken', wt)
  return wt
}

/* Passport strategy for authenticating with a username and password */
const localStrategy = new LocalStrategy(async (username, password, done) => {
  let user = await User.findOne({ username })
  if (!user) return done(null, false)
  const match = await user.compare(password)
  user = user.getPublicFields()
  match ? done(null, user) : done(null, false)
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}

/* A Passport strategy for securing RESTful endpoints using JWT */
const jwtStrategy = new JwtStrategy(jwtOptions, async ({ _id, email, username}, done) => {
  console.log('jwtStrategy', jwtOptions.jwtFromRequest)
  console.log('jwtStrategy', _id, email, username)

  const user = await User.findOne().or([{ _id }, { email }, { username }])
  console.log('jwtStrategy', user)
  user ? done(null, user) : done(null, false)
})

passport.use(localStrategy)
passport.use(jwtStrategy)

const authenticate = passport.authenticate('local', { session: false })
const restricted = passport.authenticate('jwt', { session: false })

module.exports = { authenticate, createToken, restricted }