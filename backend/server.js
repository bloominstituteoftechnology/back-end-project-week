const express = require('express');
const mongoose = require('mongoose');

const server = express();

const PORT = process.env.PORT || 5000;

mongoose
  .connect('mongodb://localhost/lambdanotes')
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
