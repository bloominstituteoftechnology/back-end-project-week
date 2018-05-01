const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const userRouter = require('./data/users/UserRouter');
const noteRouter = require('./data/notes/NoteRouter');
const secrets = require('./secrets')

const server = express();
const corsOptions = {
    "origin": "http://localhost:3000",
    "credentials": true,
};


server.use(cors(corsOptions));
server.use(helmet());
server.use(morgan());
server.use(bodyParser.json());
server.use('/users', userRouter);
server.use('/notes', noteRouter);
server.use(session({
    secret: secrets.sessionSecret,
    resave: true,
    saveUninitialized: false,
  }));

module.exports = server;