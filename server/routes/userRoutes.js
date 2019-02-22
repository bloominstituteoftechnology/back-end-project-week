const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET ||'the-future-is-unknown'

const router = express.Router()

const users = require('../../users/userModel')

const generateToken = (user) => {
  const payload = {
    id: user.id
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

    if(first_name && last_name && username && password) {
      await users.addUser(user)
      let generatedUser = await users.getUser(username) 
      const token = generateToken(generatedUser)
      res.status(201).json(token, user.id)
    } else {
      res.status(422).json({ErrMessage: 'please make sure all the fields are filled'})
    }
  } catch {
    res.status(500).json({ErrMessage: 'unable to create user'})
  }
})

router.post('/login', async (req, res) => {
  const userCreds = req.body
  console.log(userCreds)
  try {
    if (userCreds.username) {
      const user = await users.getUser(userCreds.username)
      if (user[0] && bcrypt.compareSync(userCreds.password, user[0].password)) {
        token = generateToken(user)
        const send = {token, user}
        res.status(200).json(send)
      } else {
        res.status(422).json({ErrMessage: 'incorrect username or password'})
      }
    } else {
      res.status(422).json({ErrMessage: 'please add a username'})
    }
  } catch (error) {
    res.status(500).json({ErrMessage: 'unable to login. Please try again'})
  }
})

router.get('/user', async (req, res) => {
  const username = req.body

  const user = await users.getUser(username)
  res.status(200).json(user.id)
})

module.exports = router
