const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

mongoose.connect('mongodb://ds263619.mlab.com:63619/lambdanotes', {}, err => {
  if (err) return console.log(err);
  console.log('\n===Connected to MLAB database===\n');
});

const userRouter = require('./user/userRouter');
const noteRouter = require('./note/noteRouter');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/users', userRouter);
server.use('/api/notes', noteRouter);

server.get('/', (req, res) => res.send('API Running...'));

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n===API running on ${port}===\n`));
