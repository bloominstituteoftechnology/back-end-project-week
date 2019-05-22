require('dotenv').config()

const JWT = require('jsonwebtoken')

const {
  DEV_MONGO_SECRET,
  PROD_MONGO_SECRET } = process.env

const SECRET = DEV_MONGO_SECRET || PROD_MONGO_SECRET

function authenticate(req, res, next) {
  const TOKEN = req.headers.authorization
  const USER_ID = req.params.id

  if (TOKEN) {
    JWT.verify(TOKEN, SECRET, err => {
      if (err) return res
        .status(401)
        .json('You must provide a valid token to create, edit and view your notes.')
      
      const DECODED = JWT.verify(TOKEN, SECRET)
      const { id } = DECODED

      if (id === USER_ID) next()
      else res
        .status(401)
        .json('You must provide a valid user id to create, edit and view your notes.')
    })  
  } else res
    .status(401)
    .json('You must provide a valid token to create, edit and view your notes.')
}

function validate(req, res, next) {
  const {
    title,
    text } = req.body

  const ERRORS = {
    'title': [
      'The title field is required.',
      'The title field may only contain a maximum of 30 characters.'
    ],
    'text': [
      'The text field is required.',
      'The text field may only contain a maximum of 1000 characters.'
    ]
  }

  const ERROR_OBJ = {
    status: 400,
    msg: {}
  }

  if (title) {
    if (title.length > 30) ERROR_OBJ.msg['titleError'] = ERRORS['title'][1]
  } else if (!title) ERROR_OBJ.msg['titleError'] = ERRORS['title'][0]

  if (text) {
    if (text.length > 1000) ERROR_OBJ.msg['textError'] = ERRORS['text'][1]
  } else if (!text) ERROR_OBJ.msg['textError'] = ERRORS['text'][0]

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
  authenticate,
  validate
}