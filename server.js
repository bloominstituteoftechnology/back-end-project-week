const express = require('express'),
      server = express(),
      config = require('./config'),
      mongoose = require('mongoose'),
      routes = require('./routes/router');
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
routes(server);

// enable CORS from client-side here lines 7 - 10
