const express = require('express');
const helment = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const NOTE = require('../models/note.js');

const server = express();

server.use(bodyParser.json());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
    res.status(200).json({ status: 'API Running' });
});

//server.post
//server.get - All notes
//server.get - Notes by id
//server.put
//server.remove

mongoose
  .connect('mongodb://localhost/Notes')
  .then(db => {
    console.log(`Successfully connected to the ${db.connections[0].name} database`);
  })
  .catch(error => {
    console.error('Database Connection Failed');
  })

const port = process.env.PORT || 5050;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
