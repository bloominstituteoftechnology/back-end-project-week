const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
// const morgan = require('morgan');

const server = express();

// const userRouter = require('./users/userRouter');
const noteRouter = require('./notes/noteRouter');
// const authRouter = require('./auth/authRouter');

// const db = process.env.MONGODB_URI || 'mongodb://localhost/backendDB'
const db = process.env.mongo || process.env.MONGO_MLAB
mongoose
    .connect(db)
    .then(() => console.log('=== Connected to DB ==='))
    .catch(error => console.log('\n!!! Error connecting to DB !!!\n', error))

server.use(express.json());
server.use(cors());
server.use(helmet());

// server.use('/api/user', userRouter);
server.use('/api/note', noteRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Online!</h2>`);
});

const port = process.env.PORT || 9000;
server.listen(port, () => {
  console.log(`*** Server is running on ${port} ***`);
});