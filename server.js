const server = require('express')();

server.get('/', (req, res) => {
  res.status(200).send('Lambda Notes API');
});

module.exports = {
  server
}