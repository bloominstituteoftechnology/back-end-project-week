const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/api-routes');
const authRoutes = require('./routes/auth-routes');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

const server = express();
server.use(cors(corsOptions));

// server.use('/api', routes);

// server.use('/', authRoutes);

module.exports = server;