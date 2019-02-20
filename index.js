const express = require('express'),
  bodyParser = require('body-parser'),
  notes = require('./api/notes'),
  cookieParser = require('cookie-parser'),
  cors = require('cors'),
  users = require('./api/users'),
  auth = require('./api/auth'),
  { validateJwt } = require('./middleware/auth')

const app = express()

app
  .use(cors())
  .use(cookieParser())
  .use(bodyParser.json())
  .use('/notes', notes)
  .use('/users', validateJwt, users)
  .use('/auth', auth)

app.listen(8080)