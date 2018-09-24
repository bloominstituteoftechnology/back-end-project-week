const express = require('express');
const cors = require('cors');

const db = require('./dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());


// endpoints

server.get('/', (req, res) => {
    res.send('backend project week');
});

server.get('/api/notes', (req, res) => {
    db('notes')
    .then(notes => {
      res.status(200).json(notes)
    })
    .catch(err => {
        console.log('/api/notes GET ERROR:', err);
        res.status(500).send(err);
    })
});

server.get('/api/notes/:id', (req, res) => {
    db.get(req.params.id).then(note => {
      console.log(note);
      if (note.length === 0) {
        res.status(404).json({  message: 'The note with the specified ID does not exist.' });
      }
      else {
        res.status(200).json(note)
    }}).catch(err => {
      console.error('error', err);
       res.status(500).json({ error: 'The note information could not be retrieved.'})
    })
  });

server.post('/api/notes', (req, res) => {
    if(!req.body.title || !req.body.contents){
        res.status(400).json({errorMessage: 'Please provide title and contents for note.'})
    }
    db.insert(req.body).then(id => {
        res.status(201).json(id)
    }).catch(err => {
        console.error('error',err);
        res.status(500).json({error: 'There was an error while saving the note to the database.'})
    })
});

server.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
    .then(notes => {
      if (notes.length === 0) {
          res.status(404).json({ message: "The note with the specified ID does not exist"});
      } else {res.status(200).json(notes);
      }
    })
    .catch(err => {
        res.status(500).json({error: "The note could not be removed"});
    })
});

server.put('/api/notes/:id', (req, res) => {
    db.update(req.params.id, req.body).then(notes => {
        res.status(200).json(notes)
    })
    .catch(err => res.status(500).json({ message: 'update failed'}));
})


const port = 2200;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});