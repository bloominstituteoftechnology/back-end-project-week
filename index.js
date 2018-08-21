const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors')

const db = require('./data/db.js');

const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use(cors());
server.use(express.json());

///endpoints go here

///////////endpoint for viewing notes
server.get('/notes', (req, res) => {
    db('notes').then(note => {
      res.status(200).json(note);
    })
    .catch(err => res.status(500).json(err));
    
  });
  //////////////////viewing notes

  ////////////////endpoint for getting by id

  server.get('/notes/:id', (req, res) => {
    db('notes')
    .where("id", req.params.id)
    .then(note => {
      if(note.length === 0) {
        res.status(404).json({ message: "ID DONT EXIST"});
      }
      res.status(200).json(note);
    })
    .catch(error => {
      res.status(500).json({ error: "That did not work haha"})
    });
  })

  /////////////////get by id

  /////////////////endpoint for creating notes

  server.post('/notes', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content )
    res.status(400).json({ errorMessage: "Required fields"});
    db.insert({ title, content }) 
    .into("notes")
    .then(note => res.status(201).json({title, content})) 
    .catch(err => res.status(400).json({error: "Error posting"}))
  })

  //////////////////creating notes

  ////////////////////endpoint for deleting notes

  server.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    db('notes')
    .where('id', (id))
    .delete()   
    .then(note => {
        if(note === 0) {
            res.status(404).json({ message: "That ID doesn't exists"});
        }
        res.status(200).json({message: "Success in deleting"});
    })
    .catch(error => {
        res.status(500).json({ error: "Error Deleteing post"})
    });
})

  ///////////////////////deleting notes

  //////////////////endpoint for editing notes

  server.put('/notes/:id', (req, res) => {
    const {title, content} = req.body;
    const { id } = req.params
    if(!title || !content)
    res.status(400).json({ errorMessage: "Provide title AND content please"});
    db('notes')
    .where("id",(id))
    .update({title, content})
    // .into('users')line is not needed
    .then(note => {
        if(!note) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json({title, content});
    })
    .catch(error => {
        res.status(500).json({error: "Didnt work"})
    });
})

  ////////////////////editing notes

const PORT = process.env.PORT || 3300;
server.listen(port, function() {
 console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
