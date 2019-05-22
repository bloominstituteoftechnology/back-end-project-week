require('dotenv').config()

const JWT = require('jsonwebtoken')

const {
  DEV_MONGO_SECRET,
  PROD_MONGO_SECRET } = process.env

const SECRET = DEV_MONGO_SECRET || PROD_MONGO_SECRET

function generateToken(id) {
  const OPTIONS = {}
  const PAYLOAD = { id }
  return JWT.sign(PAYLOAD, SECRET, OPTIONS)
}

function validate(req, res, next) {
  const SIGN_UP = req.path === '/signup' ? true : false
  const LOG_IN = req.path === '/login' ? true : false

  const {
    firstname,
    lastname,
    email,
    password } = req.body

  const ERRORS = {
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

  const ERROR_OBJ = {
    status: 400,
    msg: {}
  }

  if (firstname && SIGN_UP) {
    if (firstname.length > 30) ERROR_OBJ.msg['firstnameError'] = ERRORS['firstname'][1]
  } else if (!firstname && SIGN_UP) ERROR_OBJ.msg['firstnameError'] = ERRORS['firstname'][0]

  if (lastname && SIGN_UP) {
    if (lastname.length > 30) ERROR_OBJ.msg['lastnameError'] = ERRORS['lastname'][1]
  } else if (!lastname && SIGN_UP) ERROR_OBJ.msg['lastnameError'] = ERRORS['lastname'][0]

  if (email && (SIGN_UP || LOG_IN)) {
    const REGEX = /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const REGEX_RESULT = REGEX.test(email)
    const LOWERCASE = email.toLowerCase() === email

    if (!REGEX_RESULT) ERROR_OBJ.msg['emailError'] = ERRORS['email'][1]
    else if (email.length > 30) ERROR_OBJ.msg['emailError'] = ERRORS['email'][2]
    else if (!LOWERCASE) ERROR_OBJ.msg['emailError'] = ERRORS['email'][3]
  } else if (!email && (SIGN_UP || LOG_IN)) ERROR_OBJ.msg['emailError'] = ERRORS['email'][0]

  if (password && (SIGN_UP || LOG_IN)) {
    if (password.length < 8) ERROR_OBJ.msg['passwordError'] = ERRORS['password'][1]
    else if (password.length > 30) ERROR_OBJ.msg['passwordError'] = ERRORS['password'][2]
  } else if (!password && (SIGN_UP || LOG_IN)) ERROR_OBJ.msg['passwordError'] = ERRORS['password'][0]

  const NUM_OF_KEYS = Object.keys(ERROR_OBJ.msg).length > 0

  if (NUM_OF_KEYS) {
    const {
      status,
      msg } = ERROR_OBJ
  
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