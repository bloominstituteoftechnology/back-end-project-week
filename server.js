const userRouter = require('./User/userRouter');
const noteRouter = require('./Note/noteRouter');

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.json('API running');
});

server.use('/user', userRouter);
server.use('/note', noteRouter);

mongoose
  .connect('mongodb://harm13ss:ambros1a@ds151153.mlab.com:51153/notesdb')
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(err => {
    console.log('Error connecting to database', err);
  });

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`connected to port ${port}`);
});