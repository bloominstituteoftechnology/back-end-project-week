const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Routes
const noteRouter = require('./notes/noteRoutes');
const userRouter = require('./users/userRoutes');

// Initialize Server
const server = express();

// Connect to mlab
const mongoDB = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds139920.mlab.com:39920/lambdanotes`;
mongoose
    .connect(mongoDB)
    .then(connect => {
        console.log('Connected!');
    })
    .catch(err => {
        console.log('Not connected');
})

// Middleware
server.use(express.json());
server.use(cors());
server.use('/api', noteRouter);
server.use('/api', userRouter);

// Helper Functions
const getTokenForUser = userObject => {
    return jwt.sign(userObject, process.env.TOKEN_SECRET, { expiresIn: '1h' })
}

const validateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(422).json({ Error: 'No token found' })
    } else {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ Error: "Token invalid", message: err });
            } else {
                next();
            }
        })
    }
}

// Initial GET
server.get('/', (req, res) => {
    res.send({ Message: 'api running' })
})

// Connect to port
const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Server running on port: ${port}`))