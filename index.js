const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');
const server = express();
 
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/', routes);
 
 
server.listen(8000, () => {
  console.log('Server Running on Port 8000');
});