const db = require('../../dbConfig.js');

const { authenticate } = require('./middleware.js');
const { register, login } = require('./login.js');

function addNote (req, res) {
    const note = req.body;
    if (!note.title || !note.textBody) {
        res.status(400).json({ error: "Please provide a title and body for the note." })
    } else
        db.insert(note)
        .into('notes')
        .then(ids => {
        res.status(201).json(ids);
        })
        .catch(err => res.status(500).json({ error: "There was an error saving the note." }))
};

function getNotes (req, res) {
    db('notes')
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(err => res.status(500).json(err));
};

function getNoteById (req, res) {
    const {id} = req.params;
    db('notes').where({ id: id }).first()
    .then(async note => {
        if (!note) {
        res.status(404).json({ message: "The note with the specified ID does not exist." });
        } else {
            res.status(200).json(note);
        }
    })
    .catch(err => res.status(500).json(err));
};

function editNote (req, res) {
    const {id} = req.params;
    const note = req.body;
    if (!note.title || !note.textBody) {
        res.status(400).json({ error: "Please provide a title and body for the note." })
    } else
        db('notes').where({ id: id }).update(note)
        .then(count => {
        if (count) {
            res.status(200).json({ message: "The note was successfully updated." });
        } else {
            res.status(404).json({ message: "The note with the specified ID does not exist." });
        }
        })
        .catch(err => res.status(500).json(err));
};

function deleteNote (req, res) {
    const {id} = req.params;
    db('notes').where({ id: id }).del()
    .then(count => {
        if (count) {
        res.status(204).end();
        } else {
        res.status(404).json({ message: "The note with the specified ID does not exist." });
        }
    })
    .catch(err => res.status(500).json(err));
};

module.exports = server => {
    server.post('/api/register', register);
    server.post('/api/login', login);
    server.post('/api/notes', authenticate, addNote);
    server.get('/api/notes', authenticate, getNotes);
    server.get('/api/notes/:id', authenticate, getNoteById);
    server.put('/api/notes/:id', authenticate, editNote);
    server.delete('/api/notes/:id', authenticate, deleteNote);
  };
