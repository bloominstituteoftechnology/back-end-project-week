const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const cors = require('cors');

// use it before all route definitions

const db = require('./db/helpers.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors({origin: 'http://localhost:3000'})); //app is running on port 3000




server.get('/', (req,res) => {
    res.send('API for notetaking app is running')
});

//POST a new note
server.post('/api/notes', (req,res) => {
    // const {name, content} = req.body;
    // const newNote = new Notes({ name, content });

    const note = req.body;

    // if(!name || !content){
    //     res.status(400).json({message:  'Must provide a name and some text'})
    //     return;
    // }

    db
    .insert(note)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(err => res.status(500).json({message: err}));
    return;
})

//GET all notes
server.get('/api/notes', (req,res) => {
    db
    .find()
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(err => res.status(500).json({message: 'Error getting data'}));
    return;
});

//GET an individual note
server.get('/api/notes/:id', (req,res) => {

    const id = req.params.id;

    db
    .findById(id)
    .then(note => {
        if(note.length === 0){
            res.status(404).json({message:  "could not find the corresponding note"})
            return;
        }
        res.json(note);
    })
    .catch(error => {
        res.status(500).json({message: 'Error looking for post'});
    })
});

//PUT changes on a note - edit

server.put('/api/notes/:id', (req,res) => {
    const id = req.params.id;
    const name = req.body.name;
    const content = req.body.content;

    db
    .update(id, {name,content})
    .then(response => {
        if (response == 0) {
            res.status(404).json({message:  'There is no corresponding note'})
            return;
        }else{
            res.status(200).json({message: 'Note successfully updated'})
        }

        db
        .findById(id)
        .then(post => {
            if (post.length === 0) {
                res.status(404).json({message: 'This note cannot be found' })
                return;
            }
            res.json(note);
        })
        .catch(error => {
            res.status(500).json({message: 'error looking up note'})
        })
    })
})

//DELETE an existing note
server.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    //delete the post referencing the id
    db
        .remove(id)
        .then(response => {
            if(response === 0) {
                res.status(404).json({message: 'The note you are trying to delete does not exist'});
                return;
            }
            res.json({success: `Note with id: ${id} was removed from the system`});
        })
        .catch(error =>{
            res.status(500).json({message: 'This note could not be removed'});
            return;
        });
});

module.exports = server;