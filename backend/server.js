const express = require('express');
const cors = require('cors');
const helmet = require('hemlet');
const morgan = require('morgan');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('short'));

server.get('/', (req, res) => {
	res.send('server is live');
});

configureRoutes(server);
module.exports = { server };
