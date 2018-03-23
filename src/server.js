const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const config = require('./config');
const path = require('path');

mongoose.Promise = global.Promise;
mongoose.connect(config.dburl);

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true
}

const server = express();
server.use(bodyParser.json());
server.use(cors(corsOptions));
server.use(express.static(path.join('notes/build')));

server.get('/', (req, res) => {
	res.sendFile(path.join('/notes/build/index.html'));
});

routes(server);

module.exports = { server };

