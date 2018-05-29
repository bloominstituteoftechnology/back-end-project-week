const jwt = require('jsonwebtoken')
const { jwtSecret } = require('./config')

const getSessionToken = (user) => {
  const payload = {
    id: user._id,
    session: user.session
  }
  return jwt.sign(payload, jwtSecret)
}

const validateToken = (token) => {

}

module.exports = {
  getSessionToken,
  validateToken
}