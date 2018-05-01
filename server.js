const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/lambdanotesdb')
    .then(() => console.log('\n=== Connected to the Lambda Notes database ===\n'))
    .catch(() => console.log('\n=== Error connecting to the database ===\n'))

const noteRouter = require('./notes/noteRouter');
const userRouter = require('./users/userRouter');

const server = express();

server.use(helmet());
server.use(express.json());

server
    .get('/', (req, res) => {
        res.status(200).json({ api: '\n=== Connected to Server...\n'});
    });

server.use('/api/users', userRouter);
server.use('/api/notes', noteRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log('\n=== Connected to Server...\n');
});