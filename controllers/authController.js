require('dotenv').config()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models').User

//* Make Token
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

module.exports = {
  loginUser: (req, res, next) => {
    res.json({ token: makeToken(req.user), user: req.user })
  },

  registerUser: (req, res, next) => {
    const user = req.body

    //* Hash password
    const hash = bcrypt.hashSync(user.password, 14)
    user.password = hash

    User.create(user)
      .then(user => {
        const token = makeToken(user)
        res.status(201).json({ token })
      })
      .catch(next)
  }
}
