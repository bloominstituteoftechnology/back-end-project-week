const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const server = express();
const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development)









const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
