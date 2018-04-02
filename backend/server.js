require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const server = express();
const noteRouter = require('./routes/noteRoutes');

server.use(express.json());
server.use(helmet());

// server.use((req, res, next) => {
//     next();
// }); // middleware if I need to add it later

server.use('/api/notes', noteRouter);

server.get('/', function(req, res) {
  res.status(200).json({ api: 'running...' })
});

mongoose
  .connect(`mongodb://${process.env.DB_HOST}`)
  .then(conn => {
    console.log('\n\nConnected to Mongo');
  })
  .catch(err => {
    if (err) console.error(err);
  })


module.exports = { server };