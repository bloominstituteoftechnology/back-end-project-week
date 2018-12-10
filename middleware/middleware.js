const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const createNote = require('./createNote');
const editNote = require('./editNote');
const notes = require('./notes');

module.exports = server => {
  server.use(express.json());
  server.use(cors());
  server.use(morgan('combined'));
  server.use('/api/create', createNote);
  server.use('/api/edit', editNote);
  server.use('/api/notes', notes);
}