const express = require('express');
const knex = require('knex');
const cors = require('cors');

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(cors());

server.get('/server', (req, res) => {
  res.send('***THIS SERVER IS RUNNING***')
});


const port = 9000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});