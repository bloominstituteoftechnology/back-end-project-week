const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
 

const mongoose = require('mongoose');
mongoose 
  .connect('mongodb://localhost/notedb')
  .then(mongo => {
    console.log('its raining men')
  })
  .catch(err => {
    console.log('error', err);
  });

const notesController = require('./notes/notesController');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});
server.use('/notes', notesController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
