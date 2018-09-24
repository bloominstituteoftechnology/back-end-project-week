const express = require('express');
const cors = require('cors');

const db = require('./Database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());


server.get('/', (req, res) => {
    res.send('Hello!');
  });

//endpoints

//Display a list of notes
server.get('/api/notes', (req, res) => {
    db('notes')
    .then(notes => {
        res.status(200).json(notes)
    })
    .catch(error => {
        res.status(500).json({ error:'Unable to Display Notes' })
    })
});

//view an existing note
server.get('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    db('notes')
    .where({ id })
    .then(note => {
        if (note) {
            res.status(200).json(note);
        }
        else {
            res.status(404).json({error: 'The Note with this ID is not found'});
        }
    })
    .catch(error => res.status(500).json({ error: 'Cannot retrieve note information'}));
})

















const port = 6000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});