const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('./users/User');

const db = require('./config/db');
const setupRoutes = require('./config/routes');

const server = express();
const secret = "Can you keep a secret?"

db
    .connectTo('lambda-notes-db')
    .then(() => console.log('\n === API Connected to Database === \n'))
    .catch(err => console.log('\n *** Error Connecting to Database *** \n', err));

// Server code here

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/users', userRouter);
server.use('/api/notes', userRouter);

server.get('/', (req, res) => res.send('API Running...'));

const port = process.env.PORT || 5333;

server.listen(port, () => {
    console.log(`Server is up and running on port ${5333}`);
});