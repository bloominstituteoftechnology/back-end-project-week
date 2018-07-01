const express = require('express');
const mongoose = require('mongoose');
const db = require('./_config/db');
const setupMiddleware = require('./_config/middleware');
const setupRoutes = require('./_config/routes');

const server = express();

mongoose.Promise = global.Promise

const port = process.env.PORT || 5000 // use npm install dotenv

setupMiddleware(server);
setupRoutes(server);
require('dotenv').config();



db.connectTo('tasklist01db')
  .then(() => {
    console.log('\n... API Connected to  Database ...\n');
    server.listen(port, () => // need to figure out if port is needed for deployment
      console.log('\n=== API running...===\n')
    );
  })
  .catch(err => {
    console.log('\n*** ERROR Connecting to MongoDB, is it running? ***\n', err);
  });