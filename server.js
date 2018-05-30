const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const mongooseDB = require('./config/keys').mongoURL;

const port = process.env.PORT || 2121;

const server = express();
server.use(cors({}));
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.json({ Message: 'Any requests?' });
});

mongoose.connect(mongooseDB, () => {
  console.log('connected to mongodb');
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log('>o0o0o spinning vinyls on ${port}');
});
