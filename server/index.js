const express = require('express');
const db = require('./db/dbConfig');
const cors = require('cors');

const port = 8000;

const server = express();
server.use(express.json());
server.use(cors());

const reqCheck = (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Please provide both a title and content.' })
    }
    next();
}

server.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>');
})

server.get('/notes', async (req, res) => {
    try {
        const notesList = await db('notes')
        return res.status(200).json(notesList);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "There is an error while retrieving Notes" });
    }
});

server.post('/notes', reqCheck, async (req, res) => {
    try {
        const newNote = await db('notes').insert(req.body);
        res.status(201).json(newNote)

    } catch (err) {
        return res.status(500).json({ error: 'There was an error while saving the note to the database.' })
    }
})

server.listen(port, err => {
    if (err) console.log(err);
    console.log(`server is listening on port ${port}`);
});
