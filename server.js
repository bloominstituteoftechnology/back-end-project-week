const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const { jwtStrategy, localStrategy } = require('./login/login')
const passport = require("passport");

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

// Initial GET
server.get('/', (req, res) => {
    res.send({ Message: 'api running' })
})

// Connect to port
const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Server running on port: ${port}`))