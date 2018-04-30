const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const server = express();

//use middleware
server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.json({api:'running'});
});


server.listen(PORT, () => {
    console.log('Connected to Server');
});


