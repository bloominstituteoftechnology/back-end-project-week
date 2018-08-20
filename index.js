const express = require('express');

const db = require('./data/db')

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('up and running... LambdaNotes')
});

const port = 6500;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});