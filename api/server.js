
const express = require('express');

const server = express();

const db = require('../data/dbConfig.js');

server.use(express.json());

server.get('/', (req, res) =>{
  res.status(200).json({ api: "Up and Running" })
});


module.exports = server;