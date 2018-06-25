const express = require('express');
const helmet = require('helmet');
const cors = require("cors");
const mongoose = require("mongoose");

const feport = 3000;
const beport = 5000;
const server = express()

server.use(helmet());
server.use(cors({ origin: `http://localhost:${feport}` }));
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

//Mongoose
mongoose.Promise = global.Promise;

mongoose
    .connect('mongodb://localhost/lambdanotesdb')
    .then(mongo => {
        console.log('\n... API Connected to LambdaNotes DB ...\n')
    })
    .catch(err => {
        console.log('\n*** ERROR Connecting to Database ***\n', err);
    })

server.listen(beport, () => {
    console.log(`\n=== API up on port: ${beport} ===\n`)
})