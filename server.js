 
const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const port = process.env.PORT || 3333; 
 
const db = require('./db'); 
const userRoutes = require('./users/userRoutes'); 
const notesRoutes = require('./notes/notesRoutes'); 
 
const server = express(); 
 
db 
	.connectTo() 
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