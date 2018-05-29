const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000
server = express();

const db = require('./config/keys').mongoURL;
mongoose
  .connect(db)
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log(err));

server.use(express.json());
server.use(cors({}));

server.get('/', (req, res) => {
  res.status(200).json({Message: 'Hello World'});
});

server.listen(port, () => {
  console.log(`Magic happening on ${port}`);
});