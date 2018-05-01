const express = require('express');
const morgan = require('morgan');
const keys = require('./keys');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('Connected to MongoDB');
})

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Running' });
  });

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});