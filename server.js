const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const Note = require('./models/note');

server.use(express.json());
server.use(cors());
server.use(helmet());

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n server listening on port ${port}`));

const { DB_HOST, DB_USER, DB_PASS } = process.env;
mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/lambdanotes`)
  .then(mongo => console.log('connected to database'))
  .catch(err => console.log(err));

server.get('/api/notes', async (req, res) => {
  const response = await Note.find()
  res.status(200).json(response);
});

server.post('/api/notes', async (req, res) => {
  const response = await Note.create(req.body)
  res.status(200).json(response);
});


