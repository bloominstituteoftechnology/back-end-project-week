const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 3333;

const noteRoutes = require('./routes/noteRoutes');
const userRoutes = require('./routes/userRoutes');

const server = express();

server.use(express.json());
server.use(cors());
noteRoutes(server);
userRoutes(server);

mongoose.connect('mongodb://localhost/notes')
  .then(r => {
    console.log('Successfully connected to the database');
  }).catch(err => {
    console.error(err);
  });

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});