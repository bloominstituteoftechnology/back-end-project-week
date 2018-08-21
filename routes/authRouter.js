const router = require('express').Router()
const passport = require('passport')

const { loginUser, registerUser } = require('../controllers').auth

//* Local Middleware
const authenticate = passport.authenticate('local', { session: false })

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

//* Routes
router.post('/login', authenticate, loginUser)

router.post('/register', checkCredentials, registerUser)

module.exports = router
