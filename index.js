const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const helmet = require('helmet');

const server = express();

const usersRouter = require('./users/usersRouter.js');
const notesRouter = require('./notes/notesRouter.js');

const corsOptions = {
  origin: 'https://lambda-notes.netlify.com',
  credentials: true
};

server.use(cors(corsOptions));
server.use(express.json());
server.use(helmet());

const path = process.env.MONGOLAB_URI || 'mongodb://localhost/notes';

mongoose.connect(path);

const MS = require('express-mongoose-store')(session, mongoose);

server.use(
  session({
    secret: 'supersecretsecret',
    store: new MS(),
    resave: false,
    saveUninitialized: false
  })
);

const isLoggedIn = function (req, res, next) {
  if (!req.session.auth) res.status(422).json('not allowed');
  else if (req.session.id) {
    next();
  }
};

server.use('/api/notes', isLoggedIn, notesRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => res.send('API Running...!'));

const PORT = process.env.PORT || 5000;
server
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));