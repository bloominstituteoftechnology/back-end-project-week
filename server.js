const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./data/helpers/notesDb');
const cors = require('cors');
const server = express();

server.use(cors());
server.use(express.json());

server.use(morgan('dev'));


server.get('/', (req,res) => {
	const request = db.get();
	
	request.then(response => {
	res.status(200).json(response);	
	})
	
	.catch(err => {
	res.status(500).json({message: "Failed to retrieve notes"});	
	})
});

server.get('/:id', (req,res)=>{
	const id = req.params.id;

	const request = db.getById(id);

	request.then(response => { 
	if(response.length==0) res.status(404).json({ error: "The note with the specified Id does not exist." });
        else res.status(200).json(response);
        })

        .catch(err => {
        res.status(500).json({error: "Failed to retrieve teh note."});
        })	
});


server.use(function(req, res) {
  res.status(404).send("Wrong path, check url");
});

server.listen(8000, () => console.log('API running on port 8000'));

