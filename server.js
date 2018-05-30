const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;

const routes = require('./api/routes/index');

const server = express();

server.use(express.json());
server.use(cors());
server.use(bodyParser.json());

// server.get('/', (req, res) => {
//    res.json({Message: "Hello World!"});

//})

routes(server);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/lambda-notes', {}, err => {
    if (err) throw new Error(err);
    console.log('Connected to database');
});

server.listen(PORT, () => {
    console.log('Server is up')
  });

module.exports = server;