const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;

require('dotenv').config();
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() };

const routes = require('./api/routes/index');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(bodyParser.json());

// routes(server);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/lambda-notes', {}, err => {
    if (err) throw new Error(err);
    console.log('Connected to database');
});

server.listen(PORT, () => {
    console.log('Server is up')
  });

module.exports = server;