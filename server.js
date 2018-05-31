 
const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const port = process.env.PORT || 3333; 
 
const db = require('./data/db'); 
const usersRouter = require('./users/usersRouter'); 
const notesRouter = require('./notes/notesRouter'); 
 
const server = express(); 
 
db 
	.connectTo() 
	.then(() => { 
		console.log('\n API CONNECTED\n'); 
	}) 
	.catch(err => { 
		console.log(err); 
		console.log('\n CONNECTION ERROR \n'); 
	}); 
 

server.use(cors()); 
server.use(express.json()); 
 

server.use('/api/users', usersRouter); 
server.use('/api/notes', notesRouter); 
 

server.get('/', (req, res) => { 
	res.json({ Message: 'connected' }); 
}); 
 
server.listen(port, err => { 
	if (err) console.log(err); 
	console.log(`\n  Server listening on ${port}  \n`); 
}); 