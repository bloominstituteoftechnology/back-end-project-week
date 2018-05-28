const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

const routes = require('./api/routes/index');

const server = express();

server.use(express.json());
server.use(cors());

// routes(server);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/lambda-notes', {}, err => {
    if (err) throw new Error(err);
    console.log('Connected to database');
});

server.listen(port, () => {
    console.log('Server listening on port ${port}');
});

module.exports = server;