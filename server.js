const express = require('express');
const mongoose = require('mongoose');

const server = express();

// db connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/lambdaNotes');

server.use(express.json());

const routes = require('./routes/routes');
routes(server);

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
