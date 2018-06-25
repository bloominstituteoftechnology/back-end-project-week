const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const morgan = require('morgan');
const NotesRouter = require('./Notes/notesRouter.js');
const UserRouter = require('./Users/userRouter.js');
const db = require('./dbConfig.js');

const server = express();


server.use(helmet());
server.use(express.json());


server.get('/', (req, res) => res.send('API Running...'));

server.use('/api/users', UserRouter);
server.use('/api/notes', NotesRouter);

const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/LambdaNotes', {}, err => {
  if (err) console.log('Database connection failed');
  console.log('Sucessfully connected to LambdaNotes db')
})


server.listen(port, () => {
    console.log(`Server up and running on ${port}`);
  });