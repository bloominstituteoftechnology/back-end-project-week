const express = require('express');
const server = express();
const cors = require('cors');


server.use(cors());
server.use(express.json());



module.exports = { server }






