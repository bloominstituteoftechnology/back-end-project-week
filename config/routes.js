const db = require('../database/dbConfig.js');

module.exports = server => {
    server.get('/api/notes', getNotes);
    server.get('/api/notes/:id', getOneNote);
    server.post('/api/notes', addNote);
    server.delete('/api/notes/:id', deleteNote);
};

// GET ALL NOTES

function getNotes(req, res) {
    db('notes')
        .then(notes => {
            res.status(200).json(notes)
        })
        .catch(err => {
            res.status(500).json(err)
        })
};

// GET ONE NOTE

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

// ADD NEW NOTE

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

// DELETE NOTE

function deleteNote(req, res) {
    const { id } = req.params;
    db('notes')
        .where({ id })
        .del()
        .then(count => {
            count
                ? res.status(200).json(count)
                : res.status(404).json({ message: `Note not found` })
        })
        .catch(err => {
            res.status(500).json({ err: `Error` })
        })
}
