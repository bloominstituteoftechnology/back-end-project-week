const express = require('express');
const cors = require('cors');

const db = require('./db/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

// endpoints

server.post('/api/create', (req, res) => {
    const info = req.body;
    db('notes')
        .insert(info)
        .then(ids => {
        const id = ids[0];

        db('notes')
            .where({ id })
            .first()
            .then(note => {
                res.status(201).json({ id: note.id });
            })
            .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
});

server.get('/api/notes', (req, res) => {
    db('notes')
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => {
            res.status(500).json({ errMsg: 'Database could not retrieve info' })
        });
});

server.get('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    db('notes')
        .get(id)
        .then(notes => {
            if (notes) {
                res.status(200).json(notes);
            } else {
                res.status(404).json({ errMsg: `The note with the id:${id} is not found` });
            }
        })
        .catch(err => res.status(500).json({ errMsg: 'Database could not retrieve info' }));
});

server.listen(5000, () => console.log('\nrunning on port 5000\n'));