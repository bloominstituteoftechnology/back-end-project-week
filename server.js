const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

// const usersRouter = require('./users/usersRouter');
const notesRouter = require('./notes/notesRouter');

mongoose
    .connect('mongodb://admin:admin@ds141320.mlab.com:41320/lambda-notes')
    .then(() => console.log('mLab Connected to MongoDB'))
    .catch(() => console.log('Error Connecting to mLab DB'));

const server = express();
const port = process.env.PORT || 8008;

server.use(express.json());
server.use(helmet());
server.use(cors());

//Postman Test ok: http://localhost:8008 
server.get('/', (req, res) => {
    res.json({ Message: 'Server Works' });
});

//Routes
server.use('/notes', notesRouter);

server.listen(port, () => console.log(`Server Connected to ${port}`));

 // "engines": {
  //   "node": "8.9.4"
  // },


// const express = require('express');
// const helmet = require('helmet');
// const cors = require('cors');
// const userRouter = require('./users/users.controller');
// const notesRouter = require('./users/notes.controller');

// const server = express();

// server.use(express.json());
// server.use(helmet());
// server.use(cors());

// //Routes
// server.use('/api/users', userRouter);
// server.use('/api/notes', notesRouter);

// //Postman Test ok: http://localhost:8008 
// server.get('/', (req, res) => {
//     res.json({ Message: 'Server Works' });
// });

// module.exports = server;