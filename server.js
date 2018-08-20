const express = require('express');
const apiRoutes = require('./api/apiRoutes');

const server = express();

server.use(express.json());
server.use('/api', apiRoutes);

server.listen(8000, () => console.log(`Api running on Port 8000`));