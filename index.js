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
    const {id} = req.params;
    db('notes').where({ id: id })
    .then(note => {
        if (note.length === 0) {
        res.status(404).json({ message: "The note with the specified ID does not exist." });
        } else 
        res.status(200).json(note);
    })
    .catch(err => res.status(500).json(err));
});


server.post('/api/notes', (req, res) => {
    const note = req.body;
    if (!note.title || !note.content) {
        res.status(400).json({ error: "Please provide a title and content ." })
    } else
        db.insert(note)
        .into('notes')
        .then(ids => {
        res.status(201).json(ids);
        })
        .catch(err => res.status(500).json({ error: "error saving the note." }))
});

server.delete('/api/notes/:id', (req, res) => {
    const {id} = req.params;
    db('notes').where({ id: id }).del()
    .then(count => {
        if (count) {
        res.status(204).end();
        } else {
        res.status(404).json({ message: "The note with the specified ID does not exist." });
        }
    })
    .catch(err => res.status(500).json(err));
});


server.put('/api/notes/:id', (req, res) => {
    const {id} = req.params;
    const note = req.body;
    if (!note.title || !note.content) {
        res.status(400).json({ error: "Please provide a title and body for the note." })
    } else
        db('notes').where({ id: id }).update(note)
        .then(count => {
        if (count) {
            res.status(200).json({ message: "The note has been updated." });
        } else {
            res.status(404).json({ message: "The note with the specified ID does not exist." });
        }
        })
        .catch(err => res.status(500).json(err));
});


const port = 2200;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});