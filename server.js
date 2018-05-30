const express = require('express');
const helmet = require('helmet');

const mongoose = require('mongoose');
const User = require('./src/users/User');
const Note = require('./src/notes/Note');

const noteRouter = require('./routes/noteRoutes');
const userRouter = require('./routes/userRoutes');

const { dbURI } = require('./config/config')

const server = express();

mongoose.connect(dbURI)
  .then(() => {
    console.log('\n ---=== connected to mlab database ===--- \n');
  })
  .catch(err => {
    console.log('\n error connecting to database \n');
  });

server.use(helmet());
server.use(express.json());


server.use('/notes', noteRouter);
server.use('/users', userRouter);

server.get('/', (req, res) => {
  res.status(200).json('api is running');
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`\n --== API up on port: ${port} ==-- \n`);
});






