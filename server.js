const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const helmet = require('helmet');

const server = express();

const UserRouter = require('./Users/UserRouter.js');
const NotesRouter = require('./Notes/NotesRouter.js');

server.use(cors());
server.use(express.json());
server.use(helmet());

const path = process.env.MONGOLAB_URI ||'mongodb://sadrak8:lambdanotes10@ds231725.mlab.com:31725/heroku_ph95bkvg';

mongoose.connect(path);

const MS = require('express-mongoose-store')(session, mongoose);

server.use(
  session({
    secret: 'each night I wonder',
    store: new MS(),
    resave: true,
    saveUninitialized: false,
  })
);

const isLoggedIn = function (req, res, next) {
  if (!req.session.auth) res.status(422).json('Not Authorized');
  else if (req.session.id) {
    next();
  }
};

server.use('/api/notes', isLoggedIn, NotesRouter);
server.use('/api/users', UserRouter);

server.get('/', (req, res) => res.send('API Is Running...!'));

const PORT = process.env.PORT || 9000;
server
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));