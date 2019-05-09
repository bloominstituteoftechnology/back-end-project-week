require('dotenv').config()
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../users/User')
const {
  DEV_MONGO_SECRET,
  PROD_MONGO_SECRET } = process.env
const secret = DEV_MONGO_SECRET || PROD_MONGO_SECRET

function generateToken(user) {
  const options = {}
  const payload = { name: user.email }
  return jwt.sign(payload, secret, options)
}

function errorReturn(error, msg) {
  const fields = ['firstname', 'lastname', 'email', 'password']
  
  for (let key in error) {
    for (let field = 0; field < fields.length; field++) {
      if (key === fields[field]) {
        return {
          path: key,
          status: 400,
          message: error[key].message
        }
      }
    }
  }
  
  return {
    path: null,
    status: 500,
    message: msg
  }
}

router.post('/signup', (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password
  } = req.body
  
  User.findOne({ email })
    .then(user => {
      if (user) {
        res
        .status(400)
        .send([
          'email',
          'This email is already associated to an existing account.'
        ])
      } else {
        User.create({
          firstname,
          lastname,
          email,
          password
        })
        .then(() => {
          res.status(201)
          .send('The user account was successfullly created.')
        })
        .catch(err => {
          const error = errorReturn(err.errors, 'An internal server error occurred while signing up for an account.')
          res
          .status(error.status)
          .send([
            error.path,
            error.message
          ])
        })
      }
    })
    .catch(err => {
      const error = errorReturn(err.errors, 'An internal server error occurred while signing up for an account.')
      res
      .status(error.status)
      .send([error.path, error.message])
    })
})

router.post('/login', (req, res) => {
  const {
    email,
    password } = req.body
    
  User.findOne({ email })
    .then(user => {
      if (user) {
        user
        .validatePassword(password)
        .then(passwordsMatch => {
          if (passwordsMatch) {
            const token = generateToken(user)
            const {
              _id: id,
              notes } = user
            res
            .status(200)
            .send({
              id,
              notes,
              token
            })
          } else {
            res
            .status(401)
            .send('Invalid credentials. Try again.')
          }
        })
        .catch(err => {
          const error = errorReturn(err.errors, 'An internal server error occured while logging in.')
          res
          .status(error.status)
          .send([
            error.path,
            error.message
          ])
        })
      } else {
          res
          .status(401)
          .send('Invalid credentials. Try again.')
      }
    })
    .catch(err => {
      const error = errorReturn(err.errors, 'An internal server error occured while logging in.')
      res
      .status(error.status)
      .send([
        error.path,
        error.message
      ])
    })
})

module.exports = router 