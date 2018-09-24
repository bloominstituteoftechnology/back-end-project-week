const express = require('express');

const server = express();

//routes

//middleware
server.use(express.json());

server.listen(9000, () => console.log('\n== API on port 9k ==\n'));