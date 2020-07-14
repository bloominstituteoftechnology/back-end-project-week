const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { jwtSecret } = require('./config')

const getSessionToken = (user) => {
  const payload = {
    id: user._id,
    session: user.session
  }
  return jwt.sign(payload, jwtSecret)
}

const getUserForToken = async (token) => {
  let user
  try {
    const payload = jwt.verify(token, jwtSecret)
    user = await User.findOne({ _id: payload.id, session: payload.session })
  } catch (err) {
    user = null
  }
  return user
}

module.exports = {
  getSessionToken,
  getUserForToken
}