const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./api/routes/routes');
const path = require('path');

const server = express();
// const corsOptions = {
//   "origin": "http://localhost:3000",
//   "credentials": true
// };

server.use(express.json());
server.use(cors());
server.use(express.static(path.join(__dirname, 'lambda-notes', 'build')));

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'lambda-notes', 'build', 'index.html'));
});

routes(server);

module.exports = {
  server
};