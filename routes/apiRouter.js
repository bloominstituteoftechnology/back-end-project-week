const express = require('express');
const server = express.Router();

const notesRoutes = require('./notesRoutes');


server.use('/notes', notesRoutes);

module.exports = server;