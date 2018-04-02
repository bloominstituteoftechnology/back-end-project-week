const bodyParser = require('body-parser');
const express = require('express');
const db = require('./data/db.js');

const mongoose = require('mongoose');
const cors = require('cors');
const server = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  "origin": "*",
  "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
};

db
  .connectTo('lambda-notes')
  .then(() => console.log('\n... API Connected to Database ...\n'))
  .catch(err => console.log('\n*** ERROR Connecting to Database ***\n', err));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/5000');

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

server.use(cors());

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const routes = require('./api/routes/routes');
routes(server);

server.listen(port, () => console.log(`Listening on port ${port}`));