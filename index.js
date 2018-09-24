const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());
server.use('/api', require('./api'));

const port = 8000;
server.listen(port, () => console.log(`listening on port ${port}`));
