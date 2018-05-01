const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/appRoutes');

mongoose
    .connect('mongodb://localhost/lambdanotesdb')
    .then(() => console.log('\n=== Connected to the Lambda Notes database ===\n'))
    .catch(() => console.log('\n=== Error connecting to the database ===\n'))


const server = express();
const connectFrontEnd = {};

server.use(helmet());
server.use(express.json());
server.use(cors());

routes(server);

server
    .get('/', (req, res) => {
        res.status(200).json({ api: '\n=== Connected to Server...\n'});
    });

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log('\n=== Connected to Server...\n');
});