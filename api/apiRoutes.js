const express = require('express');

const notesRoutes = require('./notesRoutes');
const tagsRoutes = require('./tagsRoutes');

const api = express.Router();

api.use('/notes', notesRoutes);
api.use('/tags', tagsRoutes);

module.exports = api;