const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notes')
  .then(() => console.log('\n Connected to DB \n'))
  .catch(error => console.error('Connection to DB failed.'));

const noteController = require('./notes/noteController');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'Running' });
});

server.use('/api/notes', noteController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n API functional on port: ${port} \n`));
