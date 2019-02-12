const express = require('express');

const db = require('../data/helpers');

const server = express();

server.use(express.json());

server.get('/api/notes', async (req, res) => {
    const notes = await db.getAll();
    res.status(200).json(notes);
});

server.post('/api/notes', async (req, res) => {
    const note = req.body;
    // The note api expects both the title and content keys to be on the note object.
    if (note.title && note.content) {
        const ids = await db.insert(note);
        // We send back the ID of the newly created note.
        res.status(201).json({id: ids[0]});
    }
    else {
        res.status(422).json(
                {errorMessage: 'This endpoint expects both a title and content in the note object.', 
                received: note }
            );
    }
});

module.exports = server;