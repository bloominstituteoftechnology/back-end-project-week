const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const {dbuser, dbpass} = require('./config');
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${dbuser}:${dbpass}@ds153752.mlab.com:53752/note-mate`);

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true
}

const server = express();
server.use(bodyParser.json());
server.use(cors(corsOptions));

routes(server);

module.exports = { server };

