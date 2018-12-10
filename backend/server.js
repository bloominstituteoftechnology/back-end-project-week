const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const configureRoutes = require('./config/routes');

const server = express();

server.use(express.json());
server.use(
	cors(
		(config = {
			origin: 'http://localhost:3000',
			credentials: true
		})
	)
);
server.use(helmet());
server.use(morgan('short'));

server.get('/', (req, res) => {
	res.send('server is live');
});

configureRoutes(server);
module.exports = { server };
