const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./api/routes/routes');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');

const server = express();
const corsOptions = {
  "origin": "http://localhost:3000",
  "credentials": true
};

server.use(express.json());
server.use(cors(corsOptions));
server.use(express.static(path.join('lambda-notes/public')));

mongoose.Promise = global.Promise;
mongoose.connect(config.dburl);
// mongoose.connect('mongodb://localhost/lambda-notes', {
//   useMongoClient: true
// });

server.get('/', (req, res) => {  
    res.sendFile(path.join('lambda-notes/public/index.html'));
  });

routes(server);

module.exports = {
  server
};