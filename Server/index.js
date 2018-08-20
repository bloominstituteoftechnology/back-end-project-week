const express = require('express');
const server = express();
const db = require('./data/db.js');

const port = 8000;

server.use(express.json());


server.listen(port, () => console.log('\n==== API is running ====\n'));