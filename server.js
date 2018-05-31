const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const notes = require('./routes/note');
const users = require('./routes/user');
const login = require('./routes/login');
const register = require('./routes/register');
const { authenticate } = require('./config/authenticate');

server = express();

const db = require('./config/keys').mongoURL;
mongoose
  .connect(db)
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log(err));

server.use(express.json());
server.use(cors({}));
server.use(helmet());

server.use('/notes', authenticate, notes);
server.use('/users', users);
server.use('/users', login);
server.use('/users', register);

server.get('/', (req, res) => {
  res.status(200).json({Message: 'Hello World'});
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Magic happening on ${port}`);
});