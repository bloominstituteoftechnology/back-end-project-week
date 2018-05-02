const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000
const server = express();

const setupMiddleware = require('./setup/middleware')(server);

const setupRoutes = require('./setup/routes')(server);

mongoose
  .connect(
    'mongodb://pacManKana:LambdaN0t3s@ds111050.mlab.com:11050/lambda-notes'
  )
  .then(cnn => {
    console.log('\n=== connected to mLab mongo ===\n');
  })
  .catch(err => {
    console.log('\n=== ERROR connecting to mongo ===\n');
  });

server.listen(PORT, () => console.log('\n=== API on port 5k ===\n'));
