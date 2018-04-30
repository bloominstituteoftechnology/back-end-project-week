const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 5000;

const server = express();

mongoose
  .connect('mongodb://localhost/lambdanotes')
  .then(connect => {
    console.log('===connected to mongo');
  })
  .catch(error => {
    console.log('error connecting to mongo');
  });

server.use(express.json());

//

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
