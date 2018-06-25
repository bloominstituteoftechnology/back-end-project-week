const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');

// API Route Controllers
const userController = require('./controller/userController.js');
const noteController = require('./controller/noteController.js');

// Global Middleware
server.use(helmet());
server.use(cors());
server.use(express.json());

// API Routes
server.use('/api/users', userController);
server.use('/api/notes', noteController);

// Test API
server.get('/', (req, res) => {
    res.json({ api: running });
});

module.exports = server;
