const express = require('express')
const mongoose = require('mongoose')

const server = express()

server.get('/', (req, res) => {
  res.send({ message: 'hello' })
})

const port = process.env.PORT || 3000

mongoose.connect('mongodb+srv://lambda:lambda@cluster0-40ix5.mongodb.net/test?retryWrites=true')
  .then(() => server.listen(port, () => console.log(`Listening on ${port}`)))