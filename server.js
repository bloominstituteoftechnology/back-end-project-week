const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

const userRouter = require('./users/userRouter');
const noteRouter = require('./notes/noteRouter');

mongoose
    .connect(process.env.mongo)
    .then(() => console.log('\n=== Connected to DB ===\n'))
    .catch(error => console.log('\n!!! Error connecting to DB !!!\n', error))

server.use(express.json());
server.use(cors);
server.use(helmet);

server.use('/api/user', userRouter);
server.use('/api/note', noteRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Online!</h2>`);
});

const port = process.env.PORT || 9000;
server.listen(port, () => {
  console.log(`*** Server is running on ${port} ***`);
});