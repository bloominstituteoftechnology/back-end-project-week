const express = require('express');
const server = express();

const session = require('express-session');
const config = require('./config.json');

const STATUS_USER_ERROR = 422;
const BCRYPT_COST = 11;

const userRouter = require('./routes/users');

server.use(express.json());
server.use(session({
    secret: config.SECRET,
    resave: true,
    saveUninitialized: false
}));
server.use('/users', userRouter);

const sendUserError = (err, res) => {
    res.status(STATUS_USER_ERROR);
    if (err && err.message) {
      res.json({ message: err.message, stack: err.stack });
    } else {
      res.json({ error: err });
    }
  };

server.get('/', () => {
    console.log('testing server');
});

module.exports = { server, STATUS_USER_ERROR, BCRYPT_COST };