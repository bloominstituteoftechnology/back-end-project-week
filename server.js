const express = require('express');
const helmet = require("helmet");
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();
const port = process.env.PORT || 8181;

server.use(express.json())
server.use(cors({}));
server.use(helmet());

mongoose
	.connect("mongodb://<dbuser>:<dbpassword>@ds139970.mlab.com:39970/lambda-notes-backend")
	.then(() => console.log('==connected=='))
	.catch(() => console.log('==error connecting=='))

server.get('/', (req, res) => {
	res.json('==Server is connected==')
})

server.listen(port, err => {
	if (err) console.log(err);
	console.log(`Running on ${port}`);
});

module.exports = server;