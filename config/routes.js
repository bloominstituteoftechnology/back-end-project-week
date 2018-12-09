const db = require('../database/dbConfig.js');

module.exports = server => {
    server.get('/api/notes', getNotes);
    server.get('/api/notes/:id', getOneNote);
    server.post('/api/notes/', addNote);
};

function getNotes(req, res) {
    db('notes')
        .then(notes => {
            res.status(200).json(notes)
        })
        .catch(err => {
            res.status(500).json(err)
        })
};

function getOneNote(req, res) {
    const { id } = req.params;
    db('notes')
        .where({ id })
        .then(note => {
            res.status(200).json(note)
        })
        .catch(err => {
            res.status(500).json({ message: `note with ${id} not found` })
        });
};

function addNote(req, res) {
    const { title, content } = req.body;
    if (!title || !content) {
        res.status(422).json({ message: `Both title and content are required` })
    } else {
        db('notes')
            .insert(req.body)
            .then(ids => {
                console.log(req.body);
                res.status(201).json(ids)
            })
            .catch(err => {
                res.status(500).json(err)
            });
    };
};
