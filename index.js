const express = require('express')
const db = require('./db/helpers')
const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.send('Server Works')
})


port = 9000;
server.listen(
  port,
  console.log(`\n ===> Server is running on port:${port} <=== \n`)
);
