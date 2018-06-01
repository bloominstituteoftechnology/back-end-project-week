const express = require('express');
const helmet = require("helmet");
const cors = require('cors');
const mongoose = require('mongoose');
const noteRoutes = require('./Notes/noteRoutes');
const UserRouter = require('./Users/UserRoutes');

const server = express();

server.use(express.json())
server.use(cors({}));
server.use(helmet());
server.use('/notes', noteRoutes);
server.use('/api/users', UserRouter);

mongoose
	.connect("mongodb://faulk:backendserv11@ds139970.mlab.com:39970/lambda-notes-backend")
	.then(() => console.log('==connected=='))
	.catch(() => console.log('==error connecting=='))

server.get('/', (req, res) => {
	res.json('==Server is connected==')
})

const port = process.env.PORT || 3333;
server.listen(port, err => {
	if (err) console.log(err);
	console.log(`==Running on ${port}==`);
});