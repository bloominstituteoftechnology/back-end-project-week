const express = require('express');
const apiRoutes = require('./api/apiRoutes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());
server.use('/api', apiRoutes);
server.use(errorHandler);

server.listen(8000, () => console.log('API is running on port 8000...'));