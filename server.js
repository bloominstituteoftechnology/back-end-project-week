const express = require('express');
const cors = require('cors');
const port = process.env.Port || 8000;

const server = express();

server.use(cors());
server.use(express.json());

server.get('/', (req,res) => {
    res.json({ Message: 'Hello Wold' });
});

server.listen(port, err => {
    if (err) console.log(err);
    console.log(`Connected On Port ${port}`);
});