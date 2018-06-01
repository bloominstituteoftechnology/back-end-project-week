const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const db = require('./utils/db');
const APIroutes = require('./api/routes');

const server = express();
server.use(cors());
server.use(express.json());

APIroutes(server);

db
	.connect()
	.then(() => console.log('==== connected to mongo via mLab ===='))
	.catch(() => console.log('xxxx error connecting to mLab databse xxxx'));

server.listen(process.env.PORT || 4444, () =>
	console.log('===== server connected to port 4444 ====='),
);

server.get('/', (req, res) => {
	res.json({
		Message: '===== YAY!  Tis working! =====',
	});
});

module.exports = server;
