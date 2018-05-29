const express = require('express')

const server = express()

server.get('/', (req, res) => {
  res.send({ message: 'hello' })
})

const port = process.env.PORT || 3000
server.listen(port, () => `Listening on ${port}`)