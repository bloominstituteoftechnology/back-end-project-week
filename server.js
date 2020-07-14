const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const server = express();
const apiRoutes = require('./api/apiRoutes');

server.use(express.json());
server.use(cors());
server.use(morgan('dev'));
server.use('/api', apiRoutes);

server.listen(8000, () => console.log('\n=== API running on port 8000 ===\n'));
