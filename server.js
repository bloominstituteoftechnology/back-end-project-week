const express = require('express');
const server = express();


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