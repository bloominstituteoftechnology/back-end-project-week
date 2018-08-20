const express = require('express');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();
server.use(express.json());


server.get('/', (req, res) => {
    res.send('We have liftoff, up and running now...');
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port}\n`);
});
