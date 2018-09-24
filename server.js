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
	
	.catch(error => {
	res.status(500).json({error: "Failed to retrieve notes"});	
	})
});

server.get('/:id', (req,res)=>{
	const id = req.params.id;

	const request = db.getById(id);

	request.then(response => { 
	if(response.length==0) res.status(404).json({ error: "The note with the specified Id does not exist." });
        else res.status(200).json(response);
        })

        .catch(error => {
        res.status(500).json({error: "Failed to retrieve the note."});
        })	
});


server.post('/', (req,res)=> {
	const title = req.body.title;
	const content = req.body.content;

	const note = {title, content};

	if(!title || !content){
                res.status(400).json({error: "Failed to save note to the database. Please provide title and content for the note."});
        }

else{

        const request = db.insert(note);

        request.then(response => {
                res.status(200).json(response);
        })

        .catch(error => {
        res.status(500).json({error: "Failed to save note to the database" });
        })

        } 
});


server.delete('/:id', (req, res) => {
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

