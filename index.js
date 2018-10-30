const express = require('express');
const helmet = require('helmet');
const routes = require('./routes');
const server = express();
 
server.use(express.json());
server.use(helmet());

server.use('/', routes);
 
 
server.listen(8000, () => {
  console.log('Server Running on Port 8000');
});