const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const noteController = require('./notes/noteController');

const server = express();

server.use(cors({ origin: 'http://localhost:3000'}));
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running...' });
});

server.use('/note', noteController);

const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/lambdanotesdb', {}, (error) => {
    if (error) console.log(error);
    console.log('Mongoose connected us to lambdanotesdb');
})

server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));