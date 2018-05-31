const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

const server = express();

server.get('/', (req,res) => {
    res.status(200).json({ api: 'running' });
});

server.use(cors());
server.use(express.json());

server.listen(port, () => console.log(`\n === API running on port ${port} === \n`))