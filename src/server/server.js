const express = require('express')
const userRouter = require('./routes/user')
const noteRouter = require('./routes/note')

const server = express()

server.use(express.json())
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
  res.status(500).send({ error: err })
})

module.exports = server