const express = require('express');
const mongoose = require('mongoose');

const server = express();

const setupRoutes = require('./routes')(server);

mongoose
  .connect("mongodb://arcadia-ego:L337hunter1@ds163769.mlab.com:63769/listbackend")
  .then(() => 
  console.log("API CONNECTED TO DATABASE"))
  .catch(err => console.log('ERROR CONNECTING TO DB'))

  let port = process.env.port || 3000;

  server.listen(port, () => console.log(`\n === API on port ${port}  ===\n`));