const express = require('express'); // import express
const server = express();
const cors = require('cors');
const Joi = require('joi'); // validator

server.use(express.json()); // middleware to parse json objs. 
server.use(cors({}));

server.get('/', (req, res) => {
    res.send('Hello World!');
});

//no hard-coded port below
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server listening on ${port}...`)); // listen on port
