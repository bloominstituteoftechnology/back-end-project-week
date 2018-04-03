const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();
const PORT = process.env.PORT || 5000;

server.use(cors());

mongoose
  .connect('mongodb://localhost/LambdaNotes')
  .then(connect => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Database connection failed');
  });

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = { server };
