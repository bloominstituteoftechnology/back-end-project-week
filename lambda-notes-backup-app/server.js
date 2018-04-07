const express = require('express'); // remember to install your npm packages
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();

server.use(bodyParser.json());
server.use(cors());

// add your server code
const noteRouter = require('./notes-api/noteRouter');
const loginRouter = require('./notes-api/loginRouter');
const registerRouter = require('./notes-api/createUser');

server.use('/api/notes', noteRouter);
server.use('/api/login', loginRouter);
server.use('/api/register', registerRouter);

mongoose
  .connect('mongodb://localhost/notes')
  .then(connect => {
    console.log('API Server Connected');
  })
  .catch(error => {
    console.error('Db connection failed');
  });

server.get('/', (req, res) => res.send('API Running...'));

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
