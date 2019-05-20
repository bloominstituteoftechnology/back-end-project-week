require('dotenv').config()

const jwt = require('jsonwebtoken')

const {
  DEV_MONGO_SECRET,
  PROD_MONGO_SECRET } = process.env

const secret = DEV_MONGO_SECRET || PROD_MONGO_SECRET

function generateToken(user) {
  const options = {}
  const payload = { id: user._id }
  return jwt.sign(payload, secret, options)
}

function validate(req, res, next) {
  const signup = req.path === '/signup' ? true : false
  const login = req.path === '/login' ? true : false

  const {
    firstname,
    lastname,
    email,
    password
  } = req.body

  const errors = {
    'firstname': [
      'The first name field is required.',
      'The first name field may only contain a maximum of 30 characters.',
    ],
    'lastname': [
      'The last name field is required.',
      'The last name field may only be a maximum of 30 characters.'
    ],
    'email': [
      'The email field is required.',
      'Invalid email.',
      'The email field may only contain a maximum of 30 characters.',
      'The email field may only contain lowercase characters.'
    ],
    'password': [
      'The password field is required.',
      'The password field may only contain a minimum of 8 characters.',
      'The password field may only contain a maximum of 30 characters.'
    ]
  }

  const errorObj = {
    status: 400,
    msg: {}
  }

  if (firstname && signup) {
    if (firstname.length > 30) errorObj.msg['firstnameError'] = errors['firstname'][1]
  } else if (!firstname && signup) errorObj.msg['firstnameError'] = errors['firstname'][0]

  if (lastname && signup) {
    if (lastname.length > 30) errorObj.msg['lastnameError'] = errors['lastname'][1]
  } else if (!lastname && signup) errorObj.msg['lastnameError'] = errors['lastname'][0]

  if (email && (signup || login)) {
    const regex = /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const regexResult = regex.test(email)
    const lowercase = email.toLowerCase() === email

    if (!regexResult) errorObj.msg['emailError'] = errors['email'][1]
    else if (email.length > 30) errorObj.msg['emailError'] = errors['email'][2]
    else if (!lowercase) errorObj.msg['emailError'] = errors['email'][3]
  } else if (!email && (signup || login)) errorObj.msg['emailError'] = errors['email'][0]

  if (password && (signup || login)) {
    if (password.length < 8) errorObj.msg['passwordError'] = errors['password'][1]
    else if (password.length > 30) errorObj.msg['passwordError'] = errors['password'][2]
  } else if (!password && (signup || login)) errorObj.msg['passwordError'] = errors['password'][0]

  const numOfKeys = Object.keys(errorObj.msg).length > 0

  if (numOfKeys) {
    const {
      status,
      msg
    } = errorObj
  
    return res
      .status(status)
      .send(msg)
  }

  return next()
}

module.exports = {
  generateToken,
  validate
}