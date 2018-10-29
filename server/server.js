// dependencies
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
// server
const server = express();
// middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
// endpoint
// port
const port = 4000;
server.listen(port, () => console.log(`==== listening port ${port} ====`));
