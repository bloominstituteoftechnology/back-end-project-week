const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET ||'the-future-is-unknown'

const router = express.Router()

const users = require('../../users/userModel')

const generateToken = (user, id) => {
  const payload = {
    username: user.username,
    firstName: user.first_name,
    id: id
  };

  const options = {
    expiresIn: '2h',
    jwtid: '789123',

  }
  return jwt.sign(payload, secret, options)
}

router.post('/register', async (req, res) => {
  const user = req.body
  const hash = bcrypt.hashSync(user.password, 12)
  user.password = hash

  try {
    const {first_name, last_name, username, password} = user;

    if(first_name, last_name, username, password) {
      let id = await users.addUser(user)
      id = id[0]
      const token = generateToken(user, id)
      localStorage.setItem('token', token)

    } else {
      res.status(422).json({ErrMessage: 'please make sure all the field are filled'})
    }
  } catch {
    res.status(500).json({ErrMessage: 'unable to create user'})
  }
})

module.exports = router