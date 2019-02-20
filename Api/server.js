const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');



server.use(cors());
server.use(helmet());
server.use(express.json());



module.exports = { server }






