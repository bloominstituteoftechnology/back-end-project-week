const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const config = require('./config');
mongoose.Promise = global.Promise;
console.log('dburl', process.env.dburl);
mongoose.connect(process.env.dburl);

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true
}

const server = express();
server.use(bodyParser.json());
server.use(cors(corsOptions));

routes(server);

module.exports = { server };

