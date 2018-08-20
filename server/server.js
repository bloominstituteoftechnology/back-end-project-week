const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

const port = 8000;
server.listen(port, () => console.log(`\n=== API running on ${port} ===\n`));