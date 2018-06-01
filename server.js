const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const helmet = require('helmet');


const UserRouter = require('./Users/UsersRouter.js');
const NotesRouter = require('./Notes/NotesRouter.js');

const server = express();

server.use(cors());
server.use(express.json());
server.use(helmet());

const path = process.env.MONGOLAB_URI ||'mongodb://sadrak8:lambdanotes10@ds245250.mlab.com:45250/lambda-notes';

mongoose.connect(path);

const MS = require('express-mongoose-store')(session, mongoose);

server.use(
  session({
    secret: 'a time to be so small',
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

const port = process.env.port || 9000;
server
  .listen(port, () => console.log(`Running on ${ port }`));