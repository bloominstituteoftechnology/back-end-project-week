const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const mlab = require('./mlab');
const path = process.env.MONGOLAB_URI || mlab;
mongoose
  .connect(path)
  .then(() => console.log('\n=== Connected to Mongo ===\n'))
  .catch(err => console.log('\n === Error connecting to Mongo ===\n'));

const noteController = require('./notes/noteController');

const server = express();

server.use(helmet());
server.use(morgan('combined'));
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'API is running' });
});

server.use('/api/notes', noteController);

const port = process.env.PORT || 5050;
server.listen(port, () =>
  console.log(`\n=== API running on port ${port}===\n`)
);
