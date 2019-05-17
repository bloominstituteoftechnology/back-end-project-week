const router = require('express').Router()
const usersDB = require('../users/schema')

const middleware = require('./middleware')

const { generateToken, validate } = middleware

router.post('/signup', validate, (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password
  } = req.body
  
  usersDB.findOne({ email })
    .then(user => {
      if (user) {
        res
        .status(400)
        .send({ 'emailError': 'This email is already associated to an existing account.' })
      } else {
        usersDB.create({
          firstname,
          lastname,
          email,
          password
        })
        .then(() => {
          res.status(201)
          .send('The user account was successfullly created.')
        })
        .catch(() => {
          res
          .status(500)
          .send('An internal server error occurred while signing up for an account.')
        })
      }
    })
    .catch(() => {
      res
      .status(500)
      .send('An internal server error occurred while signing up for an account.')
    })
})

router.post('/login', validate, (req, res) => {
  const {
    email,
    password } = req.body

  usersDB.findOne({ email })
    .then(user => {
      if (user) {
        user
        .validatePassword(password)
        .then(passwordsMatch => {
          if (passwordsMatch) {
            const token = generateToken(user)
            res
            .status(200)
            .send({ token })
          } else {
            res
            .status(401)
            .send({
              'invalid': 'Invalid credentials. Try again.'
            })
          }
        })
        .catch(() => {
          res
          .status(500)
          .send('An internal server error occured while logging in.')
        })
      } else {
        res
        .status(401)
        .send({
          'invalid': 'Invalid credentials. Try again.'
        })
      }
    })
    .catch(() => {
      res
      .status(500)
      .send('An internal server error occured while logging in.')
    })
})

module.exports = router 