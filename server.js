// require statements
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const corsPrefetch = require('cors-prefetch-middleware');
const imagesUpload = require('images-upload-middleware');

// bring in database
const db = require('./db/dataModel');

// create server instance
const server = express();

// configure middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/static', express.static('./server/static'));
server.use(corsPrefetch);

// notes endpoints
server.get('/note/get/all', async (req, res) => {
    try {
        const response = await db.getNotes();
        res.status(200).json(response);
    } catch (ex) {
        res.status(500).json({message: 'There was an error fetching the notes from the database.'});
    }
});

server.post('/multiple', imagesUpload(
    './server/static/multipleFiles',
    'https://ghr-notes-back-end.herokuapp.com/static/multipleFiles',
    true
));

server.post('/note/create', async (req, res) => {
    const { title, textBody, tags } = req.body;
    try {
        const response = await db.addNote({title, textBody, tags});
        res.status(201).json(response);
    } catch (ex) {
        res.status(500).json({message: 'Could not create note in database.'});
    }
});

server.get('/note/get/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await db.getNote(id);
        res.status(200).json(response);
    } catch (ex) {
        res.status(500).json({message: 'There was an error fetching the requested note from the database.'});
    }
});

server.put('/note/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { tags, title, textBody } = req.body;
    try {
        const response = await db.updateNote(id, {title, textBody, tags});
        res.status(200).json(response);
    } catch (ex) {
        res.status(500).json({message: 'There was an error during editing.'});
    }
});

server.delete('/note/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await db.deleteNote(id);
        res.status(200).json(response);
    } catch (ex) {
        res.status(500).json({message: 'Could not delete the specified note from the database.'});
    }
});

module.exports = server;