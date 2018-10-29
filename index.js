const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const db = require('./data/dbConfig.js');

const server = express();

server.use(helmet());
server.use(morgan('combined'));
server.use(cors());
server.use(express.json());

const port = 9000;



server.listen(port, ()=> console.log(`API running on port ${port}`));