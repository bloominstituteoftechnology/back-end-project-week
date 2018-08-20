const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const apiRoutes = require('./data/routers/apiRoutes');
const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use(cors());
server.use(helmet());

server.use('/api', apiRoutes);

server.listen(8000, () => console.log('API running on port 8000... *.*'));