const express = require('express');
const server = express();
const middleware = require('./middleware/middleware');

middleware(server);

server.get('/', (req, res) => {
  res
    .status(200)
    .json({
      api: "Welcome to Lambda notes database server"
    })
})

module.exports = {
  server,
};