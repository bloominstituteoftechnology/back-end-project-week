const login = require('./User/login');
const logout = require('./User/logout');
const register = require('./User/register');
const getNotes = require('./Note/getNotes');
const newNote = require('./Note/newNote');
const updateNote = require('./Note/updateNote');
const deleteNote = require('./Note/deleteNote');

const config = require('./secrets/config');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const server = express();
server.use(morgan('dev'));
server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
  res.json({ message: 'API Is Running...' });
});

server.use('/api/login', login);
server.use('/api/logout', logout);
server.use('/api/register', register);
server.use('/api/getnotes', getNotes);
server.use('/api/newnote', newNote);
server.use('/api/updatenote', updateNote);
server.use('/api/deletenote', deleteNote);

mongoose
  .connect(config.database)
  .then(() => {
    console.log('Connected to DataBase');
  })
  .catch(err => {
    console.log('Error connecting to DataBase', err);
  });

const port = process.env.PORT || 5000;

server.listen(port, err => {
  console.log(`connected to the server port ${port}`);
});