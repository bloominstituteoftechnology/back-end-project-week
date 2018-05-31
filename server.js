const express = require('express'); 
const cors = require('cors'); 
const server = express(); 
const mongoose = require('mongoose');


const mlab =  `mongodb://imsdhk:123456a@ds121599.mlab.com:21599/backend_lambda`; 
const localDb = 'mongodb://localhost/localDb_be'

const Note = require('./src/notes/noteModel'); 

server.use(cors({})); 
server.use(express.json()); 



mongoose.connect(mlab, () => {
    console.log('connected to mLab');
});

server.get('/', (req,res) => {
    res.send("hello ")
})

server.get('/notes', (req, res) => {
  Note.find().then(resp => res.json(resp))
})


server.post('/notes', (req, res) => {
    Note.create(req.body).then(resp => res.status(201).json(resp))
    
});


server.delete('/notes/:id', function(req, res) {
    const id = req.params.id;
      Note.remove({_id: id})
      .then(response => {
        if (response.ok === 1) {
          res.status(200).json({message: `succussfully deleted the note with id: ${id}`});
        } else {
          res.status(404).json({message: "The note with the specified ID does not exist."});
        }
      })
    .catch(err => {
      res.status(500).json({error: "The note information could not be retrieved."});
    });
  });


  server.put('/notes/:id', (req, res) => {
    const { id } = req.params;
    const { noteTitle, noteBody } = req.body;
    Note.update({_id: id}, req.body)
    .then(isPresent => {
      (!req.body.noteTitle || !req.body.noteBody) ? res.status(400).json({ errorMessage: "Please provide noteTitle and noteBody for the post." })
      : isPresent ? res.status(200).json(req.body)
      : res.status(404).json({ message: "The post with the specified ID does not exist." });
    })
    .catch(error => {
      res.status(500).json({ error: "The post information could not be modified." });
    });
  });



const port =  process.env.PORT || 3333
server.listen(port, (err) => {
    if(err) console.log(err);

    console.log('connected to ' + port);
})