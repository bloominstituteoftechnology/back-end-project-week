const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const userRouter = require('./data/users/UserRouter');
const noteRouter = require('./data/notes/NoteRouter');
const secrets = process.env.secret || require('./secrets').sessionSecret;

const server = express();
const corsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};


server.use(cors(corsOptions));
server.use(helmet());
server.use(morgan());
server.use(bodyParser.json());
server.use(session({
  name: 'Auth',
  secret: secrets.sessionSecret,
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 1 * 24 *60 * 60 * 1000 },
}));
server.use('/users', userRouter);
server.use('/notes', noteRouter);


module.exports = server;