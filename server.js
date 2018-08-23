require('dotenv').config();
const express = require('express');
const apiRoutes = require('./api/apiRoutes');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(cors({ origin: 'https://lambda-notes-uvmaxlzunh.now.sh', credentials: true }));
server.use(express.json());
server.use('/api', apiRoutes);

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`Api running on Port ${port}`));