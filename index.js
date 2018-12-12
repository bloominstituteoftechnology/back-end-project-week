const express = require('express');
const db = require('./database/dbConfig');

const server = express();
server.use(express.json());

// Root endpoint
server.get('/', (req, res) => {
    res.status(200).json({ message: 'API up' });
});

// Notes endpoints
server.post('/create', async (req, res) => {
    try {
        const { title, content } = req.body;
        if (title && content) {
            await db('notes').insert({ title: title, content: content });
            res.status(201).json({ message: 'Note created.'});
        } else {
            res.status(500).json({ message: 'Title and content required.'});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

server.get('/notes', async (req, res) => {
    try {
        const notes = await db('notes');
        res.status(200).json(notes);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});






const port = process.env.PORT || 8500;

server.listen(port, () => { console.log(`\nServer up on port ${port}\n`) });