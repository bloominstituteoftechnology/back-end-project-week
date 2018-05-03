const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');
const helmet = require('helmet');

const usersRouter = require('./users/usersRouter.js');
const notesRouter = require('./notes/notesRouter.js');

const path = process.env.MONGOLAB_URI || 'mongodb://localhost/notes';

const server = express();
var store = new MongoDBStore(
  {
    uri: path,
    databaseName: 'connect_mongodb_session_test',
    collection: 'mySessions'
  });

store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
});

mongoose.connect(path);
//mongoose.connect('mongodb://localhost/notes')

const corsOptions = {
  origin: 'https://heuristic-bohr-b92bb6.netlify.com/',
  methods:['GET','POST'],
  credentials: true
};
server.use(cors(corsOptions));
server.use(helmet());
server.use(express.json());
server.use(
  session({
    secret: 'supersecretsecret',
    store: store,
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