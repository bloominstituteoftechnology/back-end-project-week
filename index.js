require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./data/dbConfig');
const parser = express.json();
const server = express();

const logger = require('morgan');
const helmet = require('helmet');
//const bcrypt = require('bcryptjs')
//const session = require('express-session')
const listsRouter = require('./routers/listsRouter');
const notesRouter = require('./routers/notesRouter');
const usersRouter = require('./routers/usersRouter')
//const server = require('./api/server.js');
server.use(cors());
server.use(express.json());
server.use(parser);
server.use(logger('tiny'));
server.use(helmet());
server.use('/api/notes', notesRouter);
server.use('/api/lists', listsRouter);
server.use('/api/users', usersRouter);
/* server.use(session({
    name: 'notsession', // default is connect.sid
    secret: 'nobody tosses a dwarf!',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000
    }, // 1 day in milliseconds
    httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
    resave: false,
    saveUninitialized: false,
  })) */

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));