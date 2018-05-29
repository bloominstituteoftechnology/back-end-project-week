const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();

const mongoDB = `mongodb://localhost/lambdanotes`;
const port = process.env.PORT || 3000;

// Connect to mongo
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

server.get('/', (req, res) => {
    res.send({ Message: 'api running' })
})

server.listen(port, () => console.log(`Server running on port: ${port}`))