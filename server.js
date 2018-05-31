const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');

const port = process.env.PORT || 5000;
const server = express();

const router = require('./routes/routes');

server.use(express.json())
server.use(cors({}));
server.use('/notes', noteRoutes);


mongoose
	.connect("mongodb://<dbuser>:<dbpassword>@ds011840.mlab.com:11840/lambda-notes")
	.then(() => console.log('==connected=='))
	.catch(() => console.log('==error connecting=='))

server.get('/', (req, res) => {
	res.json('==Server is connected==')
})

server.listen(port, err => {
    if(err) console.log(err);
    console.log('Server running on ${port}');
})