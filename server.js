const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();

// middleware
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send({ Message: 'api running' })
})

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server running on port: ${port}`))