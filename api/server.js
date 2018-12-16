const express = require('express');
const cors = require('cors');
const server = express();

const db = require('../data/dbConfig');

server.use(express.json());
server.use(cors());

server.get('/', async (req, res) => {
    res.status(200).json({ message: 'server is woke!' });
})

server.get('/api/notes', async (req, res) => {
    const notes = await db('notes');
    res.status(200).json({notes});
})

server.get('/api/notes/:id', async (req, res) => {
    const id = req.params.id;
    const note = await db('notes').where({ id: id}).first();
    res.status(200).json({note});
})

server.post('/api/notes/new', async (req, res) => {
    const note = req.body;
    if (!note.title || !note.textBody) {
        res.status(400).json({ message: 'you did something wrong' })
    } else {
        const noteId = await db('notes').insert({ title: note.title, textBody: note.textBody });
        res.status(200).json(noteId);
    }
})

server.put('/api/notes/edit/:id', async (req, res) => {
    const id = req.params.id;
    const note = req.body;
    if (!note.title || !note.textBody) {
        res.status(400).json({ message: 'you did something wrong' })
    } else {
        const noteId = await db('notes').where({ id: id }).update(note);
        res.status(200).json(noteId);
    }
})

server.delete('/api/notes/delete/:id', async (req, res) => {
    const id = req.params.id;
    const count = await db('notes').where({ id: id }).del();
    if (count === 0) {
        res.status(400).json({ errorMessage: 'Unable to find that record.' })
    } else {
        res.status(200).json()
    }
})

module.exports = server;