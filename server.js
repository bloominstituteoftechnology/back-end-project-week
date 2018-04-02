const express = require('express');
// const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./user/userRoutes');
const noteRoutes = require('./note/noteRoutes');

const server = express();

// server.use(helmet()); // https://helmetjs.github.io/
server.use(cors());   // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

mongoose
  .connect('mongodb://localhost/LambdaNotes')
  .then(conn => {
    console.log('connected to mongo Lambda Notes');
  })
  .catch(err => {
    console.log('error connect to mongo');
});

server.use('/api/user', userRoutes);
server.use('/api/notes', noteRoutes);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
