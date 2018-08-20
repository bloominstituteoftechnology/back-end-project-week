const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv').config();
const db = require('knex')(require('./knexfile').development);

const server = express();
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on port ${process.env.SERVER_PORT}`);
});
