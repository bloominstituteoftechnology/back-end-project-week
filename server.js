const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const path = process.env.MONGOLAB_URI || 'mongodb://localhost/notes';

mongoose
  .connect(path)
  .then(() => console.log('\n=== Connected to Mongo ===\n'))
  .catch(err => console.log('\n === Error connecting to Mongo ===\n'));

const noteController = require('./notes/noteController');
const userController = require('./users/userController');

const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['get', 'post', 'put', 'delete'],
    credentials: true
  })
);
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'API is running' });
});

server.use('/api/notes', noteController);
server.use('/', userController);

const port = process.env.PORT || 5050;
server.listen(port, () =>
  console.log(`\n=== API running on port ${port}===\n`)
);
