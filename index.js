const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');

const usersRouter = require('./users/usersRouter.js');
const notesRouter = require('./notes/notesRouter.js');

const server = express();

const path = process.env.MONGOLAB_URI || 'mongodb://localhost/notes';
mongoose.connect(path);
// mongoose.connect('mongodb://localhost/notes')

const corsOptions = {
  credentials: true
};
server.use(cors(corsOptions));
server.use(helmet());
server.use(express.json());
server.use(
  session({
    secret: 'supersecretsecret',
    resave: true,
    saveUninitialized: true
  })
);

const isLoggedIn = function (req, res, next) {
  if (!req.session.auth) res.status(422).json('not allowed');
  if (req.session.id) {
    next();
  }
};

server.use('/api/notes', isLoggedIn, notesRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => res.send('API Running...!'));

const PORT = process.env.PORT || 5000;
server
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));