const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
require('dotenv').config();
const knex = require('knex');
const knexfile = require('./knexfile');
const notesRoute = require('./routes/notes');
const authRoute = require('./routes/auth');
const HttpError = require('./utils/HttpError');

const dbEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const db = knex(knexfile[dbEnv]);

const server = express();
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

// auth
server.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));
server.use(passport.initialize());
server.use(passport.session());
server.use(flash());

server.use('/auth', authRoute(db, passport));
server.use('/notes', notesRoute(db));

// Error handling middleware
server.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    const { code, message } = err;
    return res.status(code).json({ message });
  }
  return res.status(404).json('The requested resource could not be found.');
});

if (process.env.NODE_ENV !== 'test') {
  server.listen(process.env.PORT || 8000, () => {
    console.log(`Listening on port ${process.env.PORT || 8000}`);
  });
}

module.exports = server;
