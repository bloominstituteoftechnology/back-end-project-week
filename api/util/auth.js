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
  const options = { expiresIn: '15m' }
  return jwt.sign(payload, secret, options)
}

/* Passport strategy for authenticating with a username and password */
const localStrategy = new LocalStrategy(async (username, password, done) => {
  let user = await User.findOne({ username })
  if (!user) return done(null, false)
  const match = await user.verifyPassword(password)
  user = user.getPublicFields()
  match ? done(null, user) : done(null, false)
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}

/* A Passport strategy for securing RESTful endpoints using JWT */
const jwtStrategy = new JwtStrategy(jwtOptions,async ({ _id, email, username }, done) => {
  const user = await User
    .findOne()
    .or([{ _id }, { email }, { username }])
    .select('email username roles')
  console.log('👉 jwtStrategy \n', user)
  user ? done(null, user) : done(null, false)
})

passport.use(localStrategy)
passport.use(jwtStrategy)

const authenticate = passport.authenticate('local', { session: false })
const restricted = passport.authenticate('jwt', { session: false })

/* Checks user's role */
const roleAuth = roles => ({ user }, res, next) => {
  return user.roles.some(role => roles.includes(role))
    ? next()
    : res.status(401).json({ err: 'You are not authorized to view to view this content.'})
}

module.exports = { authenticate, createToken, restricted, roleAuth }