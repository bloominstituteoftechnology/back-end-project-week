require('dotenv').config()

const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models').User

const makeToken = user => {
  const timestamp = Date.now()
  const payload = {
    sub: user.id,
    iat: timestamp,
    username: user.username
  }
  const options = { expiresIn: 60 * 60 * 1000 }
  return jwt.sign(payload, process.env.SECRET, options)
}

const authenticate = passport.authenticate('local', { session: false })

//* Local Middleware
const checkCredentials = (req, res, next) => {
  const { username, password } = req.body
  if (!username.trim() || username.length > 20) {
    return next(new Error('username is required (max 20 char)'))
  }
  if (!password.trim() || password.length > 20) {
    return next(new Error('password is required (20 max char)'))
  }
  //* Lowercase username
  req.body.username = username.toLowerCase()
  next()
}

router.post('/login', authenticate, (req, res) => {
  res.json({ token: makeToken(req.user), user: req.user })
})

router.post('/register', checkCredentials, (req, res, next) => {
  const user = req.body

  //* Hash password
  const hash = bcrypt.hashSync(user.password, 14)
  user.password = hash

  User.create(user)
    .then(user => {
      console.log('NEW USER CREATED', user)
      const token = makeToken(user)
      res.status(201).json({ token })
    })
    .catch(next)
})

module.exports = router
