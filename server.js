const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./data/helpers/notesDb');
const cors = require('cors');
const server = express();

server.use(cors());
server.use(express.json());

server.use(morgan('dev'));


server.get('/api/notes', (req,res) => {
	const request = db.get();
	
	request.then(response => {
	res.status(200).json(response);	
	})
	
	.catch(error => {
	res.status(500).json({error: "Failed to retrieve notes"});	
	})
});

server.get('/api/notes/:id', (req,res)=>{
	const id = req.params.id;

	const request = db.getById(id);

	request.then(response => {
	console.log(response);
	let response1 = response[0];
		
	if(response1.length==0) {
		res.status(404).json({ error: "The note with the specified Id does not exist." });
	}
	else {
		console.log(response1);
		res.status(200).json(response1);
	}	
        })

        .catch(error => {
        res.status(500).json({error: "Failed to retrieve the note."});
        })	
});


server.post('/api/notes', (req,res)=> {
	const title = req.body.title;
	const content = req.body.content;
	
	 console.log(title);
	const note = {title, content};

	if(!title || !content){
                res.status(400).json({error: "Failed to save note to the database. Please provide title and content for the note."});
        }

else{

        const request = db.insert(note);

        request.then(response => {
                res.status(201).json(response);
        })

        .catch(error => {
        res.status(500).json({error: "Failed to save note to the database" });
        })

        } 
});


server.put('/api/notes/:id', (req, res) => {
	const id = req.params.id;

	const title = req.body.title;
	const content = req.body.content;
	
	console.log(id);
	console.log(req.body);

	if(!title || !content){
	res.status(400).json({error: "Failed to update note to the database. Please provide title and content for the note."});
	}
	
	else{
	const note = {title, content};

	const request= db.update(id, note);

	request.then(response => {
	response = note;
	//response.title = note.title;
	//response.content = note.content;
	
	res.status(200).json(response);
        })

        .catch(error => {
        res.status(500).json({error: "Failed to update the note"});
        })

	}	
});





server.delete('/api/notes/:id', (req, res) => {
	const {id} = req.params;

	const request = db.remove(id);

	request.then(response => {
	res.status(200).json(response);
	})

	.catch(error => {
	res.status(500).json({error: "Failed to delete note"});
	})	

});



server.use(function(req, res) {
  res.status(404).send("Wrong path, check url");
});

server.listen(8000, () => console.log('API running on port 8000'));

