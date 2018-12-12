const express = require('express');
const server = express();
const db = require('../data/helpers/notesModel');

// Middleware
const configureMiddleware = require('../config/middleware');
configureMiddleware(server);

server.get('/', (req, res) => res.send({API: "live"}));

// Endpoints //
// GET all
server.get('/notes/all', async (req, res) => {
    try {
        const notes = await db.getAll();
        res.status(200).json(notes)
    } 
    catch (err) {
        res.status(500).json(err);
    }
});

// GET by ID
server.get('/notes/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const note = await db.getById(id);
        if (!note) {
            res.status(404).json({message: "note does not exist"})
        } 
        else {
            res.status(200).json(note)
        }
    } 
    catch (err) {
        res.status(500).json(err);
    }
});

// POST create
server.post('/notes/create', async (req, res) => {
    const {title, textBody} = req.body;
    try {
        if (!title || !textBody) {
            res.status(422).json({message: "title and/or textBody is missing"});
        } 
        else {
            let response = await db.insert(req.body)
            res.status(201).json(response)
        }
    } 
    catch (err) {
        res.status(500).json(err)
    }
})

// PUT edit 
server.put('/notes/:id', (req,res) => {
    const {title, textBody} = req.body;
    if (!title || !textBody) {
        res.status(422).json({message: "title and/or textBody is missing"});
    } 
    else {
        notesDb.getById(req.params.id)
        .then(note => {
            if (note) {
                db.update(req.params.id, req.body)
                .then(note => res.status(201).json(note))
            }
        })
        .catch(err => res.status(404).json({message:"note does not exist"}));
    }
})

// DELETE
server.delete('/notes/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const note = await db.getById(id);
        if (!note) {
            res.status(404).json({message: "note does not exist"})
        } else {
            const removal = await db.remove(id);
            res.status(200).json(removal)
        }
    } 
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = server; 