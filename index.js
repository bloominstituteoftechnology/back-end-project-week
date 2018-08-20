const express = require('express');
const db = require('./data/db.js');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('API up and running!')
  })

const port = 8000;
server.listen(port, function() {
    console.log(`\n===Web API listening on http://localhost:${port} ===\n`);
});
