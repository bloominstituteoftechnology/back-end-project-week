const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const Router = require('./src/router');

const server = express();
const port = process.env.PORT || 7777;
server.use(express.json());
server.use(helmet());
server.use(cors({}));

mongoose
  .connect('mongodb://JulianAlexander:qwerty123@ds245680.mlab.com:45680/lambdanotes')
  .then(mongo => console.log('Connected to DB'))
  .catch(err => console.log('Error connecting to DB', err));

server.get('/', (req, res) => {
  res.json({Message: `Server listening on port ${port}`});
})

server.use('/notes', Router);

server.listen(port, err => {
  if (err) console.log(err);
  else console.log(`Server listening on port ${port}`);
})