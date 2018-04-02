const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

const server = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: 'GET, POST, PUT, DELETE',
};

server.use(express.json());
server.use(cors(corsOptions));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/lambda-notes', {}, err => {
  if (err) throw new Error(err);
  console.log('Connected to database');
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
