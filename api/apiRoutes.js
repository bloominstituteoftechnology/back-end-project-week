const express = require('express');

const notesRoutes = require('./notesRoutes');

const api = express.Router();

api.use('/notes', notesRoutes);

module.exports = api;