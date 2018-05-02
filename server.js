const express = require('express');
const server = express();
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());
server.use(cors());

mongoose
  .connect(
    'mongodb://pacManKana:LambdaN0t3s>@ds111050.mlab.com:11050/lambda-notes'
  )
  .then(cnn => {
    console.log('\n=== connected to mongo ===\n');
  })
  .catch(err => {
    console.log('\n=== ERROR connecting to mongo ===\n');
  });

const setupRoutes = require('./setup/routes')(server);

server.listen(PORT);
