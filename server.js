const express = require('express');
// const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./user/userRoutes');
const noteRoutes = require('./note/noteRoutes');

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

mongoose
  .connect('mongodb://losaephan:Lantern1@ds019756.mlab.com:19756/singtafood')
  .then(conn => {
    console.log('connected to mongo Lambda Notes');
  })
  .catch(err => {
    console.log('error connect to mongo');
});

server.use('/api/user', userRoutes);
server.use('/api/note', noteRoutes);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
