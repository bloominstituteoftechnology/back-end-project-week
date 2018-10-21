const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const knex = require('knex');
const knexfile = require('./knexfile');
const notesRoute = require('./routes/notes');

const dbEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const db = knex(knexfile[dbEnv]);

const server = express();
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

server.use('/notes', notesRoute(db));

if (process.env.NODE_ENV !== 'test') {
  server.listen(process.env.PORT || 8000, () => {
    console.log(`Listening on port ${process.env.PORT || 8000}`);
  });
}

module.exports = server;
