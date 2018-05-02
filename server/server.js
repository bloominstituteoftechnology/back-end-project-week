const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();

mongoose
  .connect('mongodb://pacManKana:LambdaN0t3s@ds111050.mlab.com:11050/lambda-notes')
  .then(cnn => {
    console.log('\n=== connected to mongo ===\n');
  })
  .catch(err => {
    console.log('\n=== ERROR connecting to mongo ===\n');
  });

server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());
server.use(cors());

server.get('/', function(req, res) {
  res.send({ api: 'up and running' });
});

server.listen(5000, () => console.log('\n=== API on port 5k ===\n'));