const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = 'jagskdflasasaarandomstring';

const noteRouter = require('./notes/noteRoutes');

const server = express();

const mongoDB = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds139920.mlab.com:39920/lambdanotes`;
const port = process.env.PORT || 3001;

// Connect to mlab
mongoose
    .connect(mongoDB)
    .then(connect => {
        console.log('Connected!');
    })
    .catch(err => {
        console.log('Not connected');
})

// middleware
server.use(express.json());
server.use(cors());
server.use('/api', noteRouter);

// Initial GET
server.get('/', (req, res) => {
    res.send({ Message: 'api running' })
})

server.listen(port, () => console.log(`Server running on port: ${port}`))