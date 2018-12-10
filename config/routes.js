const db = require('../database/dbConfig.js');

module.exports = server => {
    server.get('/note/get/all', getNotes);
    server.get('/note/get/:id', getOneNote);
    server.post('/note/create', addNote);
    server.delete('/note/delete/:id', deleteNote);
    server.put('/note/edit/:id', editNote);
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
        .first()
        .then(note => {
            res.status(200).json(note)
        })
        .catch(err => {
            res.status(500).json({ message: `note with ${id} not found` })
        });
};

// ADD NEW NOTE

function addNote(req, res) {
    const { title, textBody } = req.body;
    if (!title || !textBody) {
        res.status(422).json({ message: `Both title and content are required` })
    } else {
        db('notes')
            .insert(req.body)
            .then(ids => {
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
        });
};


// EDIT NOTE

function editNote(req, res) {
    const changes = req.body;
    const { id } = req.params;
    db('notes')
        .where({ id })
        .first()
        .update(changes)
        .then(note  => {
            console.log('note', note);
            note
                ? res.status(200).json(changes)
                : res.status(404).json({ message: `Note not found` })
        })
        .catch(err => {
            res.status(500).json({ message: `Error updating`, err })
        });
};

