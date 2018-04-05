const express = require('express');
const server = express();

const session = require('express-session');
const cors = require('cors');
const config = require('./config.json');

const userRouter = require('./routes/users');
const notesRouter = require('./routes/notes');

const { authUser, sendUserError } = require('./middleware');

const corsOptions = {
    "origin": "http://localhost:3000",
    "credentials": true
  };

server.use(cors(corsOptions));
server.use(express.json());
server.use(session({
    secret: config.SECRET,
    resave: true,
    saveUninitialized: false
}));

server.use('/users', userRouter);
server.use('/notes', authUser, notesRouter);

server.get('/', (req, res) => {
    res.send('works');
});

module.exports = server;