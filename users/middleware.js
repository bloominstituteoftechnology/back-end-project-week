require('dotenv').config()

const JWT = require('jsonwebtoken')

const {
  DEV_MONGO_SECRET,
  PROD_MONGO_SECRET
} = process.env

const SECRET = DEV_MONGO_SECRET || PROD_MONGO_SECRET

function authenticate(req, res, next) {
  const TOKEN = req.headers.authorization
  const USER_ID = req.params.id

  if (TOKEN && USER_ID) {
    JWT.verify(TOKEN, SECRET, err => {
      if (err) return res
        .status(401)
        .json('An error occurred while verifying your token.')
      
      const DECODED = JWT.verify(TOKEN, SECRET)
      const { id } = DECODED

      if (id === USER_ID) next()
      else return res
        .status(401)
        .json('You must provide a valid id and token to create, edit and view your notes.')
    })  
  } else res
    .status(401)
    .json('You must provide a valid id and token to create, edit and view your notes.')
}

function validate(req, res, next) {
  const {
    title,
    text
  } = req.body

  const errors = {
    'title': [
      'The title field is required.',
      'The title may only contain a maximum of 30 characters.'
    ],
    'text': [
      'The text field is required.',
      'The text may only contain a maximum of 1000 characters.'
    ]
  }

  const errorObj = {
    status: 400,
    msg: {}
  }

  if (title) {
    if (title.length > 30) errorObj.msg['titleError'] = errors['title'][1]
  } else if (!title) errorObj.msg['titleError'] = errors['title'][0]

  if (text) {
    if (text.length > 1000) errorObj.msg['textError'] = errors['text'][1]
  } else if (!text) errorObj.msg['textError'] = errors['text'][0]

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
  authenticate,
  validate
}