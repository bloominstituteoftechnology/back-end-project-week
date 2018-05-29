const express = require('express');
const cores = require('cors');

const server = express();

server.use(cors());
server.use(express.json());

server.get('/', (req,res) => {
    res.json({ Message: 'Hello Wold' });
});

server.listen(8000, err => {
    if (err) console.log(err);
    console.log('Connected On Port 8000');
});