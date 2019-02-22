const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const secret = process.env.SECRET ||'the-future-is-unknown'

const server = express()

const notesRouter = require('./routes/notesRoutes')
const userRouter = require('./routes/userRoutes')

server.use(express.json())
server.use(cors())

function protected(req, res, next) {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({errMessage: "invalid token"})
      } else {
        next()
      }
    })
  } else {
    res.status(401).json({errMessage: "no token attached"})
  }
}

server.use('/notes', protected, notesRouter)

server.use('/users', userRouter)

module.exports = server