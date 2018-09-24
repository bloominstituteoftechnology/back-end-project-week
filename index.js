// require statements
const express = require('express');
const helmet = require('helmet');

// bring in database
const db = require('./db/dataModel');

// create server instance
const server = express();

// configure middleware
server.use(express.json());
server.use(helmet());

// notes endpoints
server.get('/note/get/all', async (req, res) => {
    try {
        const response = await db.getNotes();
        res.status(200).json(response);
    } catch (ex) {
        res.status(500).send(ex);
    }
});

server.post('/note/create', async (req, res) => {
    const { title, textBody, tags } = req.body;
    try {
        const response = await db.addNote({title, textBody, tags});
        res.status(201).json(response);
    } catch (ex) {
        res.status(500).send(ex);
    }
});

server.get('/note/get/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await db.getNote(id);
        res.status(200).json(response);
    } catch (ex) {
        res.status(500).send(ex);
    }
});

server.put('/note/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, textBody, tags } = req.body;
    try {
        const response = await db.updateNote(id, {title, textBody, tags});
        res.status(200).json(response);
    } catch (ex) {
        res.status(500).send(ex);
    }
});

server.delete('/note/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await db.deleteNote(id);
        res.status(200).json(response);
    } catch (ex) {
        res.status(500).send(ex);
    }
});

server.listen(5020, () => console.log('\n === Server listening on port 5020 === \n'));