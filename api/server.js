const express = require('express');
const server = express();
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const corsOptions = {
    origin: `${process.env.cors}`,
    credentials: true,
};

// API Route Controllers
const userController = require('./controller/userController.js');
const noteController = require('./controller/noteController.js');
const authController = require('./controller/authController.js');

// Global Middleware
server.use(morgan('combined'));
server.use(helmet());
server.use(cors(corsOptions));
server.use(express.json());

// API Routes
server.use('/api/users', userController);
server.use('/api/notes', noteController);
server.use('/api/auth', authController);


// Test API
server.get('/', (req, res) => {
    res.json({ api: `running` });
});

module.exports = server;
