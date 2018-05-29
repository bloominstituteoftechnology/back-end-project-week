const express = require('express')
const User = require('../../models/User')
const { getSessionToken } = require('../util')

const userRouter = express.Router()

userRouter.post('/register', async (req, res, next) => {
  const user = await User.create(req.body)
  const token = getSessionToken(user)
  res.status(201).send({ token })
})

userRouter.post('/login', async (req, res, next) => {
  const user = await User.login(req.body)
  if (!user) {
    res.status(400).send({ error: 'Invalid username or password' })
  }
  const token = getSessionToken(user)
  res.status(200).send({ token })
})

module.exports = userRouter