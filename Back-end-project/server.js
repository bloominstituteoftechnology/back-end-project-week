const express = require('express');
const cors = require('cors');

const knex = require('knex');
const dbConfig = require('./knexfile.js');
const db = knex(dbConfig.development);

const server = express();
var port = 5656;

server.use(express.json());
server.use(cors());

server.get('/api/notes', (req, res) => {
    db('Notes')
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({error: `Error retrieving all the notes. Please try again.`})
            console.log('get all notes error');
            console.log(err);
        })
});

server.post('/api/notes', (req, res) => {
    db('Notes').insert(req.body)
        .then(response => {
            res.status(201).json({msg: `new note created!`})
            console.log(response);
        })
        .catch(err => {
            res.status(404).json({error: `Error creating new note.`});
            console.log('add new note error');
            console.log(err);
        })
});

server.get('/api/notes/:id', (req, res) => {
    if(req.params.id){
        db('Notes').where('id', req.params.id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => {
                res.status(500).json({error: `Error retrieving this specific note.`})
                console.log('grabbing specific note error');
                console.log(err);
            })
    } else {
        res.status(404).json({error: `note at this id doesnt exist.`});
    }
});

server.put('/api/notes/:id', (req, res) => {
    db('Notes').where('id', req.params.id).update(req.body)
        .then(response => {
            res.status(200).json({msg: `note updated!`});
            console.log(response);
        })
        .catch(err => {
            res.status(404).json({error: `Error updating this note.`});
            console.log('updating note error');
            console.log(err);
        })
});

server.delete('/api/notes/:id', (req, res) => {
    db('Notes').where('id', req.params.id).del()
        .then(response => {
            res.status(200).json({msg: 'note deleted'});
            console.log(response);
        })
        .catch(err => {
            res.status(404).json({msg: 'Error deleting this note.'});
            console.log('deleting note error')
            console.log(err);
        })
})

server.listen(port, () => {
    console.log(`Server at Port ${port} is up and running!`)
});


