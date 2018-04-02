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


module.exports = { server };