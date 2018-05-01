const Note = require('../models/noteModel');

const retrieveNotes = (req, res) => {

    User
        .findById(req.params.id)
        .then(noteList => {
            let noteId = note.id;

            Note
                findById(req.params.id)
                .then(noteList => {
                    res.status(200).json(noteList);
                })
                .catch(err => {
                    res.status(500).json({ errMsg: 'Could not retrieve notes.' });
                })
        })
        .catch(err => {
            res.status(404).json(err);
        })
}

const createNote = (req, res) => {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    note
        .create()
        .then(newNote => {
            res.status(201).redirect(newNote)
        })
        .catch(err => {
            res.status(500).json({ errMsg: "Error creating new note." });
        })
}

const updateNote = (req, res) => {
    const { title, content } = req.body;

    Note 
        .findByIdAndUpdate(req.params.id, (err, updatedNote) => {
            if (err || Note === null) {
                res.status(500).json({ errMsg: 'Error retreiving selected note' })
            } else {
                res.status(200).json(updatedNote);     
            }
        })
}

const deleteNote = (req, res) => {
    
    Note
        findByIdAndRemove(req.params.id, (err, deletedNote) => {
            if (err) {
                res.status(500).json(err);
            }
                res.status(200).redirect('/:id/notes');
        })
}

module.exports = {
    retrieveNotes,
    createNote,
    updateNote,
    deleteNote,
}