const express = require('express');
const server = express();

const session = require('express-session');
const config = require('./config.json');

const userRouter = require('./routes/users');
const notesRouter = require('./routes/notes');

const { authUser, sendUserError } = require('./middleware');


server.use(express.json());
server.use(session({
    secret: config.SECRET,
    resave: true,
    saveUninitialized: false
}));

server.use('/users', userRouter);
server.use('/notes', notesRouter);

server.get('/', (req, res) => {
    res.send('works');
});
const test = 'this is a test';

module.exports = { server };