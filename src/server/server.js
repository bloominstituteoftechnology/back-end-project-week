const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user')
const noteRouter = require('./routes/note')

const server = express()

server.use(express.json())
server.use(cors())
server.use('/api/user', userRouter)
server.use('/api/note', noteRouter)

const authMiddleware = (req, res, next) => {
  const token = req.get('session')
}

server.get('/', (req, res) => {
  res.send({ message: 'hello' })
})

server.use((err, req, res, next) => {
  console.log(err)
  const status = err.status || 500
  res.status(status).send({ error: err.message })
})

module.exports = server