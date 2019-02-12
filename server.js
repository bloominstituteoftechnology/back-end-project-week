const express = require('express');
const server = express();
const middleware = require('./middleware');
const db = require('./dbConfig');
const port = 3000;

middleware(server);
server.use(express.json());


server.listen(port, () =>{
    console.log(`Server is up and running on port ${port}`)
});

module.exports = server;