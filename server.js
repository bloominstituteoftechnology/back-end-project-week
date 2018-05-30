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

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 5000;
  server.listen(port, () => console.log(`\n server listening on port ${port}`));

  const { DB_HOST, DB_USER, DB_PASS } = process.env;
  mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/lambdanotes`)
    .then(mongo => console.log('connected to database'))
    .catch(err => console.log(err));
}

const asyncHandler = fn => (req, res, next) => fn(req, res, next).catch(next);
const errorLog = (err, req, res, next) => {
  console.log(err);
  res.status(500).json(err.message);
}

server.get('/api/notes', asyncHandler(async (req, res) => {
  const response = await Note.find()
  res.status(200).json(response);
}));

server.get('/api/notes/:id', asyncHandler(async (req, res) => {
  const response = await Note.findById(req.params.id)
    || `Note with id ${req.params.id} not found`;
  res.status(200).json(response);
}));

server.post('/api/notes', asyncHandler(async (req, res) => {
  const response = await Note.create(req.body)
  res.status(201).json(response);
}));

server.put('/api/notes/:id', asyncHandler(async (req, res) => {
  const response = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true})
    || `Note with id ${req.params.id} not found`;
  res.status(200).json(response);
}));

server.delete('/api/notes/:id', asyncHandler(async (req, res) => {
  const response = await Note.findByIdAndRemove(req.params.id)
    || `Note with id ${req.params.id} not found`;
  res.status(200).json(response);
}));

// needs to be last: https://expressjs.com/en/guide/error-handling.html
server.use(errorLog);

module.exports = server;
