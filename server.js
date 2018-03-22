/* eslint-disable */
const express = require('express'),
      server = express(),
      config = require('./config/config'),
      passport = require('passport'),
      mongoose = require('mongoose'),
      router = require('./routes');
// TODO ADD cors package
// const corsOptions = {
//   origin: 'http://localhost:3333',
//   credentials: true
// };
// morgan...if needed

// db connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database);


server.listen(config.port, () => {
  console.log(`Listening on port ${config.port}.`);
});

server.use(express.json());
router(server);



