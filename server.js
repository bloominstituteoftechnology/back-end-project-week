// configuring the database
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Port = process.env.PORT || 3000;

// create express app
const server = express();

server.use(cors({}));
// parse requests of content-type - application/json
server.use(bodyParser.json());

// Connecting to the database
mongoose
  .connect(dbConfig.url)
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch(err => {
    console.log(err, 'Could not connect to the database');
  });

// define root route
server.get('/', (req, res) => {
  res.json({ notes });
});

// Require notes routes
require('./routes/note.routes.js')(server);

// listen for requests
server.listen(Port, err => {
  if (err) console.log(err);
  console.log(`Server is listening on port ${Port}`);
});
