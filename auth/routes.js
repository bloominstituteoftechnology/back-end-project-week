const ROUTER = require('express').Router()
const USERS_DB = require('../users/schema')

const MIDDLEWARE = require('./middleware')

const {
  generateToken,
  validate } = MIDDLEWARE

ROUTER.post('/signup', validate, (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password } = req.body
  
  USERS_DB
  .findOne({ email })
  .then(user => {
    if (user) res
      .status(400)
      .send({ 'emailError': 'This email is already associated to an existing account.' })
    else {
      USERS_DB
      .create({
        firstname,
        lastname,
        email,
        password
      })
      .then(() => res
        .status(201)
        .send('The user account was successfullly created.'))
      .catch(err =>
        res
        .status(500)
        .send({
          msg1: 'An internal server error occurred while signing up for an account.',
          msg2: err.message
        }))
    }
  })
  .catch(err => res
    .status(500)
    .send({
      msg1: 'An internal server error occurred while signing up for an account.',
      msg2: err.message
    }))
})

ROUTER.post('/login', validate, (req, res) => {
  const {
    email,
    password } = req.body

  USERS_DB
  .findOne({ email })
  .then(user => {
    if (user) {
      const { id } = user
      user
      .validatePassword(password)
      .then(passwordsMatch => {
        if (passwordsMatch) {
          const TOKEN = generateToken(id)
          
          res
          .status(200)
          .send({
            id,
            token: TOKEN
          })
        } else res
          .status(401)
          .send({ 'invalid': 'Invalid credentials. Try again.' })
      })
      .catch(err => res
        .status(500)
        .send({
          msg1: 'An internal server error occured while logging in.',
          msg2: err.message
        }))
    } else res
      .status(401)
      .send({ 'invalid': 'Invalid credentials. Try again.' })
  })
  .catch(err => res
    .status(500)
    .send({
      msg1: 'An internal server error occured while logging in.',
      msg2: err.message
    }))
})

module.exports = ROUTER 