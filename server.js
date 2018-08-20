const express = require('express')

const server = express()
server.use(express.json())

server.listen(1234, () => console.log('... 1234 ...'))

module.exports = server
