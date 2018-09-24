const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./db/dbconfig.js');

const server = express();

server.use(express.json());
server.use(cors());

const port = process.env.PORT || 3300;
server.listen(port, () => {
    console.log(`\n=== Server listening on port ${port}\n`);
});