const express = require('express')
const User = require('../../models/User')
const { getSessionToken } = require('../util')

const userRouter = express.Router()

userRouter.post('/register', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    const token = getSessionToken(user)
    res.status(201).send({ user, token })
  } catch (err) {
    next(err)
  }
})

userRouter.post('/login', async (req, res, next) => {
  try {
    const user = await User.login(req.body)
    const token = getSessionToken(user)
    res.status(200).send({ user, token })
  } catch (err) {
    next(err)
  }
})

module.exports = userRouter