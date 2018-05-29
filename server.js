const express = require('express');
const bodyParser = require('body-parser');
const Port = 3000;

// create express app
const server = express();

// parse requests of content-type - application/json
server.use(bodyParser.json());

// define root route
server.get('/', (req, res) => {
  res.json({ message: 'Welcome to Lambda-Notes.' });
});

// listen for requests
server.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});
