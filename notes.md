add a start script to package.json that reads 'node index.js'

if you push and the server breaks, try running it locally first.

# INDEX.JS

const server = require('./api/server.js');
const port = process.env.PORT || 9000;

server.listen(port, () =>
console.log(`\n** welcome to the server running on ${port} **\n`)

# SERVER.JS

const express = require('express');
const cors = require('cors');
const server = express();
const db = require('../data/dbConfig.js');
const morgan = require('morgan');

const port = process.env.PORT || 9000;

server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

//Sanity Check
server.get('/', (req, res) => {
res.send(`Api running on port: ${port}`);
});

INSTALL POSTGRES
npm i pg
