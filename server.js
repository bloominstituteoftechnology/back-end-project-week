const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://anon:anon@ds014368.mlab.com:14368/notes')
  .then(() => console.log('\n Connected to DB \n'))
  .catch(error => console.error('Connection to DB failed.'));

const noteController = require('./notes/noteController');
const userController = require('./users/userController');
const server = express();

const corsOptions = {
  origin: '*',
}

server.use(helmet());
server.use(express.json());
server.use(cors(corsOptions));

server.get('/', (req, res) => {
  res.status(200).json({ api: 'Running' });
});

server.use('/api/notes', noteController);
server.use('/api/user', userController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n API functional on port: ${port} \n`));
