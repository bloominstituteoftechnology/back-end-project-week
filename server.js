const express = require ('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');


const server = express();

server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());


const port =5000;
server.listen(port, () =>console.log('server listening at port 5000'));
