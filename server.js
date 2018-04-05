const express = require('express');
const server = express();

const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config.json');

const userRouter = require('./routes/users');
const notesRouter = require('./routes/notes');

const { authUser, sendUserError } = require('./middleware');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
  // "SECRET": "b58PiqsEtjexkTj3Eqovsszq8ovjfgGHFMfUzSmJO21dtXs34e"


mongoose.connect('mongodb://myxozoa:1554GfG1554@ds135399.mlab.com:35399/lambda-notes', () => {
    console.log('connected to mongo');
});
server.use(session({
    secret: config.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

const corsOptions = {
    "origin": "http://localhost:3000",
    "credentials": true
  };

server.use(cookieParser());
server.use(cors(corsOptions));
server.use(express.json());

server.use('/users', userRouter);
server.use('/notes', authUser, notesRouter);

server.get('/', (req, res) => {
    res.send('works');
});

module.exports = server;