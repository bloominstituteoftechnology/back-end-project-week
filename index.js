const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());

// server instantiation

const port = 8000;
server.listen(port, () => console.log(`Server listening on port ${port}.`));
