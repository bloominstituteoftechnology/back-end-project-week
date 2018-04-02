require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const server = express();
const noteRouter = require('./routes/noteRoutes');
const userRouter = require('./routes/userRoutes');
const host = process.env.DB_HOST;
const success = process.env.STATUS_SUCCESS;

server.use(express.json());
server.use(helmet());

// server.use((req, res, next) => {
//     next();
// }); // middleware if I need to add it later

server.use('/api/notes', noteRouter);
server.use('/api/users', userRouter);

server.get('/', function(req, res) {
  res.status(success).json({ api: 'running...' });
});

mongoose
  .connect(`mongodb://${host}`)
  .then(conn => {
    console.log('\n\nConnected to Mongo');
  })
  .catch(err => {
    if (err) console.error(err);
  })


module.exports = { server };