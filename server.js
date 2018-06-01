const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3333;

// const db = require('mongodb://david:davidpok1@ds135540.mlab.com:35540/lambda-notes'); 
const userRoutes = require('./users/userRoutes');
const notesRoutes = require('./notes/notesRoutes');

const server = express();

mongoose
	.connect('mongodb://david:davidpok1@ds135540.mlab.com:35540/lambda-notes')
	.then(() => {
		console.log('\n API CONNECTED \n');
	})
	.catch(err => {
		console.log(err);
		console.log('\n CONNECTION ERROR \n');
	});

server.use(cors());
server.use(express.json());

server.use('/api/users', userRoutes);
server.use('/api/notes', notesRoutes);

server.get('/', (req, res) => {
	res.json({ Message: 'connected' });
});

server.listen(port, err => {
	if (err) console.log(err);
	console.log(`\n  Server listening on ${port}  \n`);
}); 