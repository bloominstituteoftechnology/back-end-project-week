const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://ds263619.mlab.com:63619/jeremyjonesdb')
  .then(() => console.log('\n=== Connected to MLAB ===\n'))
  .catch(err => console.log('\n === Error connecting to MLAB ===\n'));

const server = express();

server.use(helmet());
server.use(morgan('combined'));
server.use(cors());
server.use(express.json());

const port = process.env.PORT || 5050;
server.listen(port, () =>
  console.log(`\n=== API running on port ${port}===\n`)
);
