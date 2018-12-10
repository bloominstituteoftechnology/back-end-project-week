const express = require('express');
const server = express();
const notesDb = require('../data/notesModel');

// bringing in the relevant middleware
const configureMiddleware = require('../config/middleware');
configureMiddleware(server);

// API Status at base URL
server.get('/', (req, res) => res.send({API: "live"}));

// GET all notes
server.get('/note/get/all', async (req, res) => {
    try {
        const notes = await notesDb.getAll();
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET by id endpoint 
server.get('/note/get/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const note = await notesDb.getById(id);
        if (!note) {
            res.status(404).json({message: "Nonexistent note"})
        } else {
            res.status(200).json(note)
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

// POST endpoint
server.post('/note/create', async (req, res) => {
    const {title, textBody} = req.body;
    try {
        if (!title || !textBody) {
            res.status(422).json({message: "Please fill out all fields"});
        } else {
            let response = await notesDb.insert(req.body)
            res.status(201).json(response)
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

// PUT endpoint 
server.put('note/edit/:id', async (req, res) => {
    const {id} = req.params;
    const {title, textBody} = req.body;
    try {
        if (!title || !textBody) {
            res.status(422).json({message: "Please fill out all fields"});
        } else {
            const note = await notesDb.getById(id);
            if (!note) {
                res.status(404).json({message: "Nonexistent note"})
            } else {
                let response = await notesDb.insert(req.body)
                res.status(201).json(response)
            }
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE endpoint
server.delete('/note/delete/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const note = await notesDb.getById(id);
        if (!note) {
            res.status(404).json({message: "Nonexistent note"})
        } else {
            const removal = await notesDb.remove(id);
            res.status(200).json(removal)
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = server;    