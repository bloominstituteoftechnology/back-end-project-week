require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());


// server working?
server.get('/', (req, res) => {
  res.send('Its Alive!');
});

server.listen(5500, () => console.log('\nrunning on port 5500\n'));