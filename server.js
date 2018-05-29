const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const port = process.env.PORT || 8000;
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());


server.get('/', (req, res) => {
    res.json({ Message: 'Hello World' });
});

server.listen(8000, err => {
    if(err) console.log(err);
    console.log(`API Running on ${port}`);
});

module.exports = server;