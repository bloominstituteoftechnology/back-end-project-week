const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const notesRouter = require('./notes/notesRouter');

mongoose
  .connect('mongodb://cjmarsh:password@ds139920.mlab.com:39920/notes')
  .then(mongo => console.log('Connected to DB'))
  .catch(err => console.log('Error connecting to DB', err));

const server = express();
const port = process.env.PORT;

server.use(express.json());
server.use(helmet());
server.use(cors({}));

server.get('/', (req, res) => {
  res.json({Message: `Server listening on port ${port}`});
})

server.use('/notes', notesRouter);

server.listen(port, err => {
  if (err) console.log(err);
  else console.log(`Server listening on port ${port}`);
})